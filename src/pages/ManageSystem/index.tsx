import AllTeams from '@/components/AllTeams';
import { ListPagination } from '@/services/general/data';
import {
  delRoleApi,
  getSystemMembersApi,
  getSystemUserRoleApi,
  updateRoleApi,
} from '@/services/roles/api';
import { TeamMemberTable } from '@/services/teams/data';
import { CrownOutlined, DeleteOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Flex, message, Modal, Spin, Tabs, theme, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import AddMemberModal from './Components/AddMemberModal';

const ManageSystem = () => {
  const [activeTabKey, setActiveTabKey] = useState('teams');
  const [loading, setLoading] = useState(false);
  const [membersLoading, setMembersLoading] = useState(false);
  const [userData, setUserData] = useState<{ user_id: string; role: string } | null>(null);
  const actionRef = useRef<any>();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const intl = useIntl();
  const { token } = theme.useToken();

  const checkUserAuth = async () => {
    setLoading(true);
    try {
      const userData = await getSystemUserRoleApi();
      setUserData(userData);
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
  };

  const renderTeamsRange = () => {
    return (
      <Spin spinning={loading}>
        <AllTeams
          tableType='manageSystem'
          systemUserRole={userData?.role as 'admin' | 'member' | 'owner'}
        />
      </Spin>
    );
  };

  const renderSystemMember = () => {
    const updateRole = async (teamId: string, userId: string, role: 'admin' | 'member') => {
      try {
        const { error } = await updateRoleApi(teamId, userId, role);
        if (error) {
          message.error(
            intl.formatMessage({
              id: 'teams.members.actionError',
              defaultMessage: 'Action failed!',
            }),
          );
        } else {
          message.success(
            intl.formatMessage({
              id: 'teams.members.actionSuccess',
              defaultMessage: 'Action success!',
            }),
          );
          actionRef.current?.reload();
        }
      } catch (error) {
        console.error(error);
      }
    };

    const columns: ProColumns<TeamMemberTable>[] = [
      {
        title: <FormattedMessage id='teams.members.email' defaultMessage='Email' />,
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: <FormattedMessage id='teams.members.memberName' defaultMessage='Member Name' />,
        dataIndex: 'display_name',
        key: 'display_name',
      },
      {
        title: <FormattedMessage id='teams.members.role' defaultMessage='Role' />,
        dataIndex: 'role',
        key: 'role',
        render: (_, record) => (
          <span>
            {record.role === 'admin' ? (
              <FormattedMessage id='teams.members.role.admin' defaultMessage='Admin' />
            ) : record.role === 'owner' ? (
              <FormattedMessage id='teams.members.role.owner' defaultMessage='Owner' />
            ) : record.role === 'member' ? (
              <FormattedMessage id='teams.members.role.member' defaultMessage='Member' />
            ) : (
              <></>
            )}
          </span>
        ),
      },
      {
        title: <FormattedMessage id='teams.members.actions' defaultMessage='Actions' />,
        key: 'actions',
        render: (_: any, record: TeamMemberTable) => (
          <Flex gap='small'>
            {
              <Tooltip
                title={<FormattedMessage id='teams.members.delete' defaultMessage='Delete' />}
              >
                <Button
                  disabled={
                    !(
                      record.role !== 'owner' &&
                      (userData?.role === 'owner' || userData?.role === 'admin')
                    )
                  }
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
                      title: intl.formatMessage({ id: 'teams.members.deleteConfirm.title' }),
                      content: intl.formatMessage({ id: 'teams.members.deleteConfirm.content' }),
                      onOk: async () => {
                        try {
                          const { error } = await delRoleApi(record.team_id, record.user_id);
                          if (error) {
                            message.error(
                              intl.formatMessage({
                                id: 'teams.members.actionError',
                                defaultMessage: 'Action failed!',
                              }),
                            );
                          } else {
                            message.success(
                              intl.formatMessage({
                                id: 'teams.members.actionSuccess',
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
                title={<FormattedMessage id='teams.members.setAdmin' defaultMessage='Set Admin' />}
              >
                <Button
                  disabled={!(record.role === 'member' && userData?.role === 'owner')}
                  shape='circle'
                  size='small'
                  icon={<CrownOutlined />}
                  onClick={() => updateRole(record?.team_id, record?.user_id, 'admin')}
                />
              </Tooltip>
            }
            {
              <Tooltip
                title={
                  <FormattedMessage id='teams.members.setMember' defaultMessage='Set Member' />
                }
              >
                <Button
                  disabled={!(record.role === 'admin' && userData?.role === 'owner')}
                  shape='circle'
                  size='small'
                  icon={<UserOutlined />}
                  onClick={() => updateRole(record?.team_id, record?.user_id, 'member')}
                />
              </Tooltip>
            }
          </Flex>
        ),
      },
    ];

    return (
      <Spin spinning={loading}>
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
              <FormattedMessage id='menu.manageSystem' defaultMessage='System Management' /> /{' '}
              <FormattedMessage
                id='pages.manageSystem.tabs.members'
                defaultMessage='Member Management'
              />
            </>
          }
          toolBarRender={() => {
            return [
              <Tooltip
                key={0}
                title={<FormattedMessage id='teams.members.add' defaultMessage='Add' />}
              >
                <Button
                  disabled={!(userData?.role === 'admin' || userData?.role === 'owner')}
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
              return await getSystemMembersApi(params, sort);
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
      </Spin>
    );
  };

  const tabs = [
    {
      key: 'teams',
      label: <FormattedMessage id='pages.manageSystem.tabs.teams' />,
      children: renderTeamsRange(),
    },
    {
      key: 'settings',
      label: <FormattedMessage id='pages.manageSystem.tabs.members' />,
      children: renderSystemMember(),
    },
  ];

  return (
    <PageContainer title={<FormattedMessage id='menu.manageSystem' />}>
      <Tabs activeKey={activeTabKey} onChange={onTabChange} tabPosition='left' items={tabs} />
    </PageContainer>
  );
};

export default ManageSystem;
