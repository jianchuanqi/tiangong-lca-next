import { ListPagination } from '@/services/general/data';
import {
  delRoleApi,
  getReviewMembersApi,
  getReviewUserRoleApi,
  updateRoleApi,
} from '@/services/roles/api';
import { TeamMemberTable } from '@/services/teams/data';
import { CrownOutlined, DeleteOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Flex, message, Modal, Spin, Tabs, theme, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import AddMemberModal from './Components/AddMemberModal';
import AssignmentReview from './Components/AssignmentReview';

const Review = () => {
  const [activeTabKey, setActiveTabKey] = useState('unassigned');
  const [loading, setLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState<string | null>(null);
  const [memberLoading, setMemberLoading] = useState<string | null>(null);
  const [membersLoading, setMembersLoading] = useState(false);
  const [userData, setUserData] = useState<{ user_id: string; role: string } | null>(null);
  const actionRef = useRef<any>();
  const unassignedTableRef = useRef<any>();
  const assignedTableRef = useRef<any>();
  const reviewTableRef = useRef<any>();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const intl = useIntl();
  const { token } = theme.useToken();

  const checkUserAuth = async () => {
    setLoading(true);
    try {
      const userData = await getReviewUserRoleApi();
      setUserData(userData);
      unassignedTableRef.current?.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
    if (key === 'unassigned' && unassignedTableRef.current) {
      unassignedTableRef.current.reload();
    } else if (key === 'assigned' && assignedTableRef.current) {
      assignedTableRef.current.reload();
    } else if (key === 'review' && reviewTableRef.current) {
      reviewTableRef.current.reload();
    } else if (key === 'members' && actionRef.current) {
      actionRef.current.reload();
    }
  };

  const renderReviewMember = () => {
    const updateRole = async (
      teamId: string,
      userId: string,
      role: 'review-admin' | 'review-member',
    ) => {
      if (role === 'review-admin') {
        setAdminLoading(userId);
      } else {
        setMemberLoading(userId);
      }
      try {
        const { error } = await updateRoleApi(teamId, userId, role);
        if (error) {
          message.error(
            intl.formatMessage({
              id: 'pages.review.members.actionError',
              defaultMessage: 'Action failed!',
            }),
          );
        } else {
          message.success(
            intl.formatMessage({
              id: 'pages.review.members.actionSuccess',
              defaultMessage: 'Action success!',
            }),
          );
          actionRef.current?.reload();
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (role === 'review-admin') {
          setAdminLoading(null);
        } else {
          setMemberLoading(null);
        }
      }
    };

    const columns: ProColumns<TeamMemberTable>[] = [
      {
        title: <FormattedMessage id='pages.review.members.email' defaultMessage='Email' />,
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: (
          <FormattedMessage id='pages.review.members.memberName' defaultMessage='Member Name' />
        ),
        dataIndex: 'display_name',
        key: 'display_name',
      },
      {
        title: <FormattedMessage id='pages.review.members.role' defaultMessage='Role' />,
        dataIndex: 'role',
        key: 'role',
        render: (_, record) => (
          <span>
            {record.role === 'review-admin' ? (
              <FormattedMessage id='pages.review.members.role.admin' defaultMessage='Admin' />
            ) : record.role === 'review-member' ? (
              <FormattedMessage id='pages.review.members.role.member' defaultMessage='Member' />
            ) : (
              <></>
            )}
          </span>
        ),
      },
      {
        title: <FormattedMessage id='pages.review.actions' defaultMessage='Actions' />,
        key: 'actions',
        render: (_: any, record: TeamMemberTable) => (
          <Flex gap='small'>
            {
              <Tooltip
                title={
                  <FormattedMessage id='pages.review.members.delete' defaultMessage='Delete' />
                }
              >
                <Button
                  disabled={!(userData?.role === 'review-admin' && record.role === 'review-member')}
                  shape='circle'
                  size='small'
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    Modal.confirm({
                      okButtonProps: {
                        type: 'primary',
                        style: { backgroundColor: token.colorPrimary },
                      },
                      cancelButtonProps: {
                        style: { borderColor: token.colorPrimary, color: token.colorPrimary },
                      },
                      title: intl.formatMessage({ id: 'pages.review.members.deleteConfirm.title' }),
                      content: intl.formatMessage({
                        id: 'pages.review.members.deleteConfirm.content',
                      }),
                      onOk: async () => {
                        try {
                          const { error } = await delRoleApi(record.team_id, record.user_id);
                          if (error) {
                            message.error(
                              intl.formatMessage({
                                id: 'pages.review.members.actionError',
                                defaultMessage: 'Action failed!',
                              }),
                            );
                          } else {
                            message.success(
                              intl.formatMessage({
                                id: 'pages.review.members.actionSuccess',
                                defaultMessage: 'Action success!',
                              }),
                            );
                          }
                          actionRef.current?.reload();
                        } catch (error) {
                          console.error(error);
                        }
                      },
                    });
                  }}
                />
              </Tooltip>
            }
            {
              <Tooltip
                title={
                  <FormattedMessage id='pages.review.members.setAdmin' defaultMessage='Set Admin' />
                }
              >
                <Button
                  disabled={!(record.role === 'review-member' && userData?.role === 'review-admin')}
                  shape='circle'
                  size='small'
                  icon={<CrownOutlined />}
                  onClick={() => updateRole(record?.team_id, record?.user_id, 'review-admin')}
                  loading={adminLoading === record?.user_id}
                />
              </Tooltip>
            }
            {
              <Tooltip
                title={
                  <FormattedMessage
                    id='pages.review.members.setMember'
                    defaultMessage='Set Member'
                  />
                }
              >
                <Button
                  disabled={!(record.role === 'review-admin' && userData?.role === 'review-admin')}
                  shape='circle'
                  size='small'
                  icon={<UserOutlined />}
                  onClick={() => updateRole(record?.team_id, record?.user_id, 'review-member')}
                  loading={memberLoading === record?.user_id}
                />
              </Tooltip>
            }
          </Flex>
        ),
      },
    ];

    return (
      <>
        <ProTable<TeamMemberTable, ListPagination>
          loading={membersLoading}
          columns={columns}
          rowKey='email'
          search={false}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          headerTitle={
            <>
              <FormattedMessage id='menu.review' defaultMessage='Review Management' /> /{' '}
              <FormattedMessage id='pages.review.tabs.members' defaultMessage='Member Management' />
            </>
          }
          toolBarRender={() => {
            return [
              <Tooltip
                key={0}
                title={<FormattedMessage id='pages.review.members.add' defaultMessage='Add' />}
              >
                <Button
                  disabled={!(userData?.role === 'review-admin')}
                  type='text'
                  icon={<PlusOutlined />}
                  onClick={() => setAddModalVisible(true)}
                />
              </Tooltip>,
            ];
          }}
          request={async (
            params: {
              pageSize: number;
              current: number;
            },
            sort,
          ) => {
            try {
              if (!userData?.role) {
                return {
                  data: [],
                  success: true,
                  total: 0,
                };
              }
              setMembersLoading(true);
              return await getReviewMembersApi(params, sort);
            } catch (error) {
              console.error(error);
              return {
                data: [],
                success: true,
                total: 0,
              };
            } finally {
              setMembersLoading(false);
            }
          }}
          actionRef={actionRef}
        />
        <AddMemberModal
          open={addModalVisible}
          onCancel={() => setAddModalVisible(false)}
          onSuccess={() => {
            actionRef.current?.reload();
          }}
        />
      </>
    );
  };

  const tabs = [
    ...(userData?.role === 'review-admin'
      ? [
          {
            key: 'unassigned',
            label: <FormattedMessage id='pages.review.tabs.unassigned' />,
            children: (
              <AssignmentReview
                actionRef={unassignedTableRef}
                tableType='unassigned'
                userData={userData}
              />
            ),
          },
          {
            key: 'assigned',
            label: <FormattedMessage id='pages.review.tabs.assigned' />,
            children: (
              <AssignmentReview
                actionRef={assignedTableRef}
                tableType='assigned'
                userData={userData}
              />
            ),
          },
        ]
      : []),
    {
      key: 'review',
      label: <FormattedMessage id='pages.review.tabs.review' />,
      children: (
        <AssignmentReview actionRef={reviewTableRef} tableType='review' userData={userData} />
      ),
    },
    {
      key: 'members',
      label: <FormattedMessage id='pages.review.tabs.members' />,
      children: renderReviewMember(),
    },
  ];

  useEffect(() => {
    if (userData?.role === 'review-member' && activeTabKey !== 'review') {
      setActiveTabKey('review');
      if (reviewTableRef.current) {
        reviewTableRef.current.reload();
      }
    }
    if (userData?.role === 'review-admin' && activeTabKey !== 'unassigned') {
      setActiveTabKey('unassigned');
      if (unassignedTableRef.current) {
        unassignedTableRef.current.reload();
      }
    }
  }, [userData]);

  return (
    <PageContainer title={<FormattedMessage id='pages.review.title' />}>
      <Spin spinning={loading}>
        <Tabs activeKey={activeTabKey} onChange={onTabChange} tabPosition='left' items={tabs} />
      </Spin>
    </PageContainer>
  );
};

export default Review;
