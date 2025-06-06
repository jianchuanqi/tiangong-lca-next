import { UpdateReferenceContext } from '@/contexts/updateReferenceContext';
import { getContactDetail, updateContact } from '@/services/contacts/api';
import { genContactFromData } from '@/services/contacts/util';
import styles from '@/style/custom.less';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import { ActionType, ProForm, ProFormInstance } from '@ant-design/pro-components';
import { Button, Collapse, Drawer, Space, Spin, Tooltip, Typography, message } from 'antd';
import type { FC } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { ContactForm } from './form';

type Props = {
  id: string;
  version: string;
  buttonType: string;
  actionRef?: React.MutableRefObject<ActionType | undefined>;
  lang: string;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContactEdit: FC<Props> = ({
  id,
  version,
  buttonType,
  actionRef,
  lang,
  setViewDrawerVisible,
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const formRefEdit = useRef<ProFormInstance>();
  const [spinning, setSpinning] = useState(false);
  const [initData, setInitData] = useState<any>({});
  const [fromData, setFromData] = useState<any>(undefined);
  const [activeTabKey, setActiveTabKey] = useState<string>('contactInformation');
  const [referenceValue, setReferenceValue] = useState<number>(0);
  const [showRules, setShowRules] = useState<boolean>(false);
  const intl = useIntl();

  useEffect(() => {
    if (showRules) {
      setTimeout(() => {
        formRefEdit.current?.validateFields();
      });
    }
  }, [showRules]);

  const onEdit = useCallback(() => {
    setDrawerVisible(true);
  }, [setViewDrawerVisible]);

  const handletFromData = () => {
    if (fromData)
      setFromData({
        ...fromData,
        [activeTabKey]: formRefEdit.current?.getFieldsValue()?.[activeTabKey] ?? {},
      });
  };

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const onReset = () => {
    setSpinning(true);
    formRefEdit.current?.resetFields();
    getContactDetail(id, version).then(async (result) => {
      const contactFromData = genContactFromData(result.data?.json?.contactDataSet ?? {});
      setInitData(contactFromData);
      formRefEdit.current?.setFieldsValue(contactFromData);
      setFromData(contactFromData);
      setSpinning(false);
    });
  };

  const updateReference = async () => {
    setReferenceValue(referenceValue + 1);
  };

  useEffect(() => {
    if (!drawerVisible) {
      setShowRules(false);
      return;
    }
    onReset();
  }, [drawerVisible]);

  return (
    <>
      {buttonType === 'icon' ? (
        <Tooltip title={<FormattedMessage id='pages.button.edit' defaultMessage='Edit' />}>
          <Button shape='circle' icon={<FormOutlined />} size='small' onClick={onEdit} />
        </Tooltip>
      ) : (
        <Button onClick={onEdit}>
          <FormattedMessage
            id={buttonType.trim().length > 0 ? buttonType : 'pages.button.edit'}
            defaultMessage='Edit'
          />
        </Button>
      )}

      <Drawer
        destroyOnClose={true}
        getContainer={() => document.body}
        title={
          <FormattedMessage id='pages.contact.drawer.title.edit' defaultMessage='Edit Contact' />
        }
        width='90%'
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => setDrawerVisible(false)}
          />
        }
        maskClosable={false}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button
              onClick={() => {
                setShowRules(true);
              }}
            >
              <FormattedMessage id='pages.button.check' defaultMessage='Data check' />
            </Button>
            <Button
              onClick={() => {
                updateReference();
              }}
            >
              <FormattedMessage
                id='pages.button.updateReference'
                defaultMessage='Update reference'
              />
            </Button>
            <Button onClick={() => setDrawerVisible(false)}>
              <FormattedMessage id='pages.button.cancel' defaultMessage='Cancel' />
            </Button>
            {/* <Button onClick={onReset}>
              <FormattedMessage id="pages.button.reset" defaultMessage="Reset" />
            </Button> */}
            <Button
              onClick={() => {
                setShowRules(false);
                formRefEdit.current?.submit();
              }}
              type='primary'
            >
              <FormattedMessage id='pages.button.save' defaultMessage='Save' />
            </Button>
          </Space>
        }
      >
        <Spin spinning={spinning}>
          <UpdateReferenceContext.Provider value={{ referenceValue }}>
            <ProForm
              formRef={formRefEdit}
              onValuesChange={(_, allValues) => {
                setFromData({ ...fromData, [activeTabKey]: allValues[activeTabKey] ?? {} });
              }}
              submitter={{
                render: () => {
                  return [];
                },
              }}
              initialValues={initData}
              onFinish={async () => {
                setSpinning(true);
                const formFieldsValue = formRefEdit.current?.getFieldsValue();
                const updateResult = await updateContact(id, version, formFieldsValue);
                if (updateResult?.data) {
                  message.success(
                    intl.formatMessage({
                      id: 'pages.button.create.success',
                      defaultMessage: 'Created successfully!',
                    }),
                  );
                  setDrawerVisible(false);
                  setViewDrawerVisible(false);
                  actionRef?.current?.reload();
                } else {
                  message.error(updateResult?.error?.message);
                }
                setSpinning(true);
                return true;
              }}
            >
              <ContactForm
                lang={lang}
                activeTabKey={activeTabKey}
                formRef={formRefEdit}
                onData={handletFromData}
                onTabChange={onTabChange}
                showRules={showRules}
              />
            </ProForm>
          </UpdateReferenceContext.Provider>
          <Collapse
            items={[
              {
                key: '1',
                label: 'JSON Data',
                children: (
                  <Typography>
                    <pre>{JSON.stringify(fromData, null, 2)}</pre>
                  </Typography>
                ),
              },
            ]}
          />
        </Spin>
      </Drawer>
    </>
  );
};

export default ContactEdit;
