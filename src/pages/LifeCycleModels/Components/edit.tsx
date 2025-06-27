import type { refDataType } from '@/pages/Utils/review';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { Grid, Transform, XFlow, XFlowGraph } from '@antv/xflow';
import { Button, Drawer, Layout, theme, Tooltip } from 'antd';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'umi';
import ToolbarEdit from './toolbar/editIndex';

type Props = {
  id: string | undefined;
  version: string | undefined;
  buttonType: string;
  lang: string;
  actionRef?: React.MutableRefObject<ActionType | undefined>;
  disabled?: boolean;
  hideReviewButton?: boolean;
  updateNodeCb?: (ref: refDataType) => Promise<void>;
};
const LifeCycleModelEdit: FC<Props> = ({
  id,
  version,
  buttonType,
  lang,
  actionRef,
  disabled = false,
  hideReviewButton = false,
  updateNodeCb,
}) => {
  const [isSave, setIsSave] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const { token } = theme.useToken();

  const { Sider, Content } = Layout;

  const onEdit = () => {
    setDrawerVisible(true);
  };

  const siderStyle: React.CSSProperties = {
    paddingTop: 8,
    textAlign: 'center',
    backgroundColor: token.colorBgBase,
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100%)',
    minWidth: 'calc(100%)',
    maxWidth: 'calc(100%)',
    height: 'calc(100%)',
    minHeight: 'calc(100%)',
    maxHeight: 'calc(100%)',
  };

  const reload = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  return (
    <>
      {buttonType === 'toolIcon' ? (
        <Tooltip
          title={
            <FormattedMessage
              id='pages.button.model.lifecyclemodel'
              defaultMessage='Lifecycle model infomation'
            ></FormattedMessage>
          }
          placement='left'
        >
          <Button
            type='primary'
            size='small'
            style={{ boxShadow: 'none' }}
            icon={<FormOutlined />}
            onClick={onEdit}
            disabled={disabled}
          />
        </Tooltip>
      ) : buttonType === 'icon' ? (
        <Tooltip title={<FormattedMessage id='pages.button.edit' defaultMessage='Edit' />}>
          <Button shape='circle' icon={<FormOutlined />} size='small' onClick={onEdit} />
        </Tooltip>
      ) : (
        <Button onClick={onEdit}>
          <FormattedMessage
            id={buttonType ? buttonType : 'pages.button.edit'}
            defaultMessage='Edit'
          />
        </Button>
      )}
      <Drawer
        getContainer={() => document.body}
        title={
          <FormattedMessage
            id={'pages.flow.model.drawer.title.edit'}
            defaultMessage={'Edit Model'}
          />
        }
        width='100%'
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => {
              if (isSave) reload();
              setDrawerVisible(false);
            }}
          />
        }
        maskClosable={false}
        open={drawerVisible}
        onClose={() => {
          if (isSave) reload();
          setDrawerVisible(false);
        }}
      >
        <XFlow>
          <Layout style={layoutStyle}>
            <Layout>
              <Content>
                <XFlowGraph
                  zoomable
                  pannable
                  minScale={0.5}
                  connectionOptions={{
                    snap: true,
                    allowBlank: false,
                    allowLoop: false,
                    allowMulti: false,
                    allowNode: false,
                    allowEdge: false,
                    router: {
                      name: 'manhattan',
                    },
                    connector: {
                      name: 'rounded',
                    },
                  }}
                />
                <Grid
                  type='dot'
                  options={{
                    color: '#595959',
                    thickness: 1,
                  }}
                />
                <Transform resizing rotating />
              </Content>
            </Layout>
            <Sider width='50px' style={siderStyle}>
              <ToolbarEdit
                id={id ?? ''}
                version={version ?? ''}
                lang={lang}
                drawerVisible={drawerVisible}
                isSave={isSave}
                setIsSave={setIsSave}
                action={'edit'}
                hideReviewButton={hideReviewButton}
                updateNodeCb={updateNodeCb}
              />
            </Sider>
          </Layout>
        </XFlow>
      </Drawer>
    </>
  );
};

export default LifeCycleModelEdit;
