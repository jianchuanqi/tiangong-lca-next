import LangTextItemForm from '@/components/LangTextItem/form';
import RequiredMark from '@/components/RequiredMark';
import ContactSelectForm from '@/pages/Contacts/Components/select/form';
import SourceSelectForm from '@/pages/Sources/Components/select/form';
// import { getRules } from '@/pages/Utils';
import { CloseOutlined } from '@ant-design/icons';
import { ProFormInstance } from '@ant-design/pro-components';
import { Button, Card, Col, Divider, Form, Row, Select, Space } from 'antd';
import { FC, useState } from 'react';
import { FormattedMessage } from 'umi';
// import schema from '../../processes_schema.json';
import { reviewTypeOptions } from '../optiondata';
import DataQualityIndicatorItemForm from './DataQualityIndicator/form';
import ScopeItemForm from './Scope/form';
// const { TextArea } = Input;

type Props = {
  name: any;
  lang: string;
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
  onData: () => void;
  showRules?: boolean;
};

const ReveiwItemForm: FC<Props> = ({ name, lang, formRef, onData, showRules = false }) => {
  const [reviewDetailsError, setReviewDetailsError] = useState(false);
  return (
    <Form.Item>
      <Form.List name={[...name]}>
        {(subFields, subOpt) => (
          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
            {subFields.map((subField) => (
              <Row key={subField.key}>
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Card
                    size='small'
                    title={
                      <>
                        <FormattedMessage
                          id='pages.process.modellingAndValidation.validation.review'
                          defaultMessage='Review'
                        />{' '}
                        {` ${subField.key + 1}`}
                      </>
                    }
                    extra={
                      <CloseOutlined
                        style={{
                          // cursor: subFields.length === 1 ? 'not-allowed' : 'pointer',
                          marginTop: '10px',
                        }}
                        onClick={() => {
                          // if (subFields.length === 1) {
                          //   return;
                          // }
                          subOpt.remove(subField.name);
                        }}
                      />
                    }
                  >
                    <Col flex='auto' style={{ marginRight: '10px' }}>
                      <Form.Item
                        label={
                          <FormattedMessage
                            id='pages.process.validation.modellingAndValidation.review.type'
                            defaultMessage='Type of review'
                          />
                        }
                        name={[subField.name, '@type']}
                        // rules={
                        //   showRules
                        //     ? getRules(
                        //         schema['processDataSet']['modellingAndValidation']['validation'][
                        //           'review'
                        //         ]['@type']['rules'],
                        //       )
                        //     : []
                        // }
                      >
                        <Select options={reviewTypeOptions} />
                      </Form.Item>
                    </Col>
                    <Card
                      size='small'
                      title={
                        <FormattedMessage
                          id='pages.process.modellingAndValidation.validation.review.scope'
                          defaultMessage='Scope of review'
                        />
                      }
                    >
                      <ScopeItemForm showRules={showRules} name={[subField.name, 'common:scope']} />
                    </Card>
                    <br />
                    <Card
                      size='small'
                      title={
                        <FormattedMessage
                          id='pages.process.modellingAndValidation.validation.review.dataQualityIndicators'
                          defaultMessage='Data quality indicators'
                        />
                      }
                    >
                      <DataQualityIndicatorItemForm
                        name={[
                          subField.name,
                          'common:dataQualityIndicators',
                          'common:dataQualityIndicator',
                        ]}
                      />
                    </Card>
                    <Divider
                      className='required-divider'
                      orientationMargin='0'
                      orientation='left'
                      plain
                    >
                      <RequiredMark
                        label={
                          <FormattedMessage
                            id='pages.process.view.modellingAndValidation.validation.reviewDetails'
                            defaultMessage='Review details'
                          />
                        }
                        showError={reviewDetailsError}
                      />
                    </Divider>
                    <LangTextItemForm
                      name={[subField.name, 'common:reviewDetails']}
                      listName={[...name]}
                      label={
                        <FormattedMessage
                          id='pages.process.view.modellingAndValidation.validation.reviewDetails'
                          defaultMessage='Review details'
                        />
                      }
                      setRuleErrorState={setReviewDetailsError}
                      // rules={
                      //   showRules
                      //     ? getRules(
                      //         schema['processDataSet']['modellingAndValidation']['validation'][
                      //           'review'
                      //         ]['common:reviewDetails']['rules'],
                      //       )
                      //     : []
                      // }
                    />
                    <Divider orientationMargin='0' orientation='left' plain>
                      <FormattedMessage
                        id='pages.process.view.modellingAndValidation.validation.otherReviewDetails'
                        defaultMessage='Other review details'
                      />
                    </Divider>
                    <LangTextItemForm
                      name={[subField.name, 'common:otherReviewDetails']}
                      listName={[...name]}
                      label={
                        <FormattedMessage
                          id='pages.process.view.modellingAndValidation.validation.otherReviewDetails'
                          defaultMessage='Other review details'
                        />
                      }
                    />
                    <ContactSelectForm
                      parentName={name}
                      name={[subField.name, 'common:referenceToNameOfReviewerAndInstitution']}
                      label={
                        <FormattedMessage
                          id='pages.process.view.modellingAndValidation.referenceToNameOfReviewerAndInstitution'
                          defaultMessage='Reviewer name and institution'
                        />
                      }
                      lang={lang}
                      formRef={formRef}
                      onData={onData}
                      // rules={
                      //   showRules
                      //     ? getRules(
                      //         schema['processDataSet']['modellingAndValidation']['validation'][
                      //           'review'
                      //         ]['common:referenceToNameOfReviewerAndInstitution']['@refObjectId'][
                      //           'rules'
                      //         ],
                      //       )
                      //     : []
                      // }
                    />
                    <br />
                    <SourceSelectForm
                      parentName={name}
                      name={[subField.name, 'common:referenceToCompleteReviewReport']}
                      label={
                        <FormattedMessage
                          id='pages.process.view.modellingAndValidation.referenceToCompleteReviewReport'
                          defaultMessage='Complete review report'
                        />
                      }
                      lang={lang}
                      formRef={formRef}
                      onData={onData}
                      // rules={
                      //   showRules
                      //     ? getRules(
                      //         schema['processDataSet']['modellingAndValidation']['validation'][
                      //           'review'
                      //         ]['common:referenceToCompleteReviewReport']['@refObjectId']['rules'],
                      //       )
                      //     : []
                      // }
                    />
                  </Card>
                </Space>
              </Row>
            ))}
            <Button
              type='dashed'
              onClick={() =>
                subOpt.add({
                  'common:scope': [{}],
                })
              }
              block
            >
              + <FormattedMessage id='pages.button.item.add' defaultMessage='Add' />{' '}
              <FormattedMessage id='pages.process.validation.review' defaultMessage='Review' />{' '}
              <FormattedMessage id='pages.button.item.label' defaultMessage='Item' />
            </Button>
          </div>
        )}
      </Form.List>
    </Form.Item>
  );
};

export default ReveiwItemForm;
