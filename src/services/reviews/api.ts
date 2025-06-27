import { getLifeCyclesByIds } from '@/services/lifeCycleModels/api';
import { supabase } from '@/services/supabase';
import { FunctionRegion } from '@supabase/supabase-js';
import { getLangText } from '../general/util';
import { genProcessName } from '../processes/util';

export async function addReviewsApi(id: string, data: any) {
  const { error } = await supabase
    .from('reviews')
    .insert({
      id: id,
      json: data,
      state_code: 0,
    })
    .select();
  return { error };
}

export async function updateReviewApi(reviewIds: React.Key[], data: any) {
  let result: any = {};
  const session = await supabase.auth.getSession();
  if (session.data.session) {
    result = await supabase.functions.invoke('update_review', {
      headers: {
        Authorization: `Bearer ${session.data.session?.access_token ?? ''}`,
      },
      body: { reviewIds, data },
      region: FunctionRegion.UsEast1,
    });
  }
  return result?.data;
}

export async function getReviewerIdsApi(reviewIds: React.Key[]) {
  const { data } = await supabase
    .from('reviews')
    .select('reviewer_id')
    .in('id', reviewIds)
    .single();

  return data?.reviewer_id ?? [];
}

export async function getReviewsDetail(id: string) {
  const { data } = await supabase.from('reviews').select('*').eq('id', id).single();
  return data;
}

export async function getReviewsTableData(
  params: { pageSize: number; current: number },
  sort: any,
  type: 'unassigned' | 'assigned' | 'review',
  lang: string,
) {
  const sortBy = Object.keys(sort)[0] ?? 'modified_at';
  const orderBy = sort[sortBy] ?? 'descend';
  let query = supabase
    .from('reviews')
    .select('*', { count: 'exact' })
    .order(sortBy, { ascending: orderBy === 'ascend' })
    .range(
      ((params.current ?? 1) - 1) * (params.pageSize ?? 10),
      (params.current ?? 1) * (params.pageSize ?? 10) - 1,
    );

  if (type === 'unassigned') {
    query = query.eq('state_code', 0);
  }
  if (type === 'assigned') {
    query = query.eq('state_code', 1);
  }
  if (type === 'review') {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;
    if (userId) {
      query = query.filter('reviewer_id', 'cs', `[${JSON.stringify(userId)}]`).eq('state_code', 1);
    }
  }
  const result = await query;

  if (result?.data) {
    if (result?.data.length === 0) {
      return Promise.resolve({
        data: [],
        success: true,
        total: 0,
      });
    }

    const processIds: string[] = [];
    result?.data.forEach((i) => {
      const id = i?.json?.data?.id;
      if (id) {
        processIds.push(id);
      }
    });
    const modelResult = await getLifeCyclesByIds(processIds);
    let data = result?.data.map((i: any) => {
      const model = modelResult?.data?.find(
        (j) => j.id === i?.json?.data?.id && j.version === i?.json?.data?.version,
      );
      return {
        key: i.id,
        id: i.id,
        isFromLifeCycle: model ? true : false,
        name:
          (model
            ? genProcessName(model?.name ?? {}, lang)
            : genProcessName(i?.json?.data?.name ?? {}, lang)) || '-',
        teamName: getLangText(i?.json?.team?.name ?? {}, lang),
        userName: i?.json?.user?.name ?? '-',
        createAt: new Date(i.created_at).toISOString(),
        json: i?.json,
      };
    });

    return Promise.resolve({
      data: data,
      page: params?.current ?? 1,
      success: true,
      total: result?.count ?? 0,
    });
  }
  return Promise.resolve({
    data: [],
    success: true,
    total: 0,
  });
}
