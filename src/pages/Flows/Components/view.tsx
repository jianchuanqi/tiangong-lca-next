import LangTextItemDescription from '@/components/LangTextItem/description';
import LevelTextItemDescription from '@/components/LevelTextItem/description';
import LocationTextItemDescription from '@/components/LocationTextItem/description';
import SourceSelectDescription from '@/pages/Sources/Components/select/description';
import ReferenceUnit from '@/pages/Unitgroups/Components/Unit/reference';
import { getFlowDetail } from '@/services/flows/api';
import { FlowpropertyTabTable } from '@/services/flows/data';
import { genFlowFromData, genFlowPropertyTabTableData } from '@/services/flows/util';
import { ListPagination } from '@/services/general/data';
import { CheckCircleOutlined, CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Card, Descriptions, Divider, Drawer, Space, Spin, Tooltip } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';
import { FormattedMessage } from 'umi';
import { complianceOptions, flowTypeOptions } from './optiondata';
import PropertyView from './Property/view';

type Props = {
  id: string;
  lang: string;
  buttonType: string;
  data?: any;
};

const getComplianceLabel = (value: string) => {
  const option = complianceOptions.find((opt) => opt.value === value);
  return option ? option.label : '-';
};

const FlowsView: FC<Props> = ({ id, buttonType, lang }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState<string>('flowInformation');
  const [spinning, setSpinning] = useState(false);
  const [initData, setInitData] = useState<any>({});
  const [propertyDataSource, setPropertyDataSource] = useState<any>([]);

  const tabList = [
    {
      key: 'flowInformation',
      tab: (
        <FormattedMessage id="pages.flow.view.flowInformation" defaultMessage="Flow information" />
      ),
    },
    {
      key: 'modellingAndValidation',
      tab: (
        <FormattedMessage
          id="pages.flow.view.modellingAndValidation"
          defaultMessage="Modelling and validation"
        />
      ),
    },
    {
      key: 'administrativeInformation',
      tab: (
        <FormattedMessage
          id="pages.flow.view.administrativeInformation"
          defaultMessage="Administrative information"
        />
      ),
    },
    {
      key: 'flowProperties',
      tab: <FormattedMessage id="pages.flow.view.flowProperty" defaultMessage="Flow property" />,
    },
  ];

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const propertyColumns: ProColumns<FlowpropertyTabTable>[] = [
    {
      title: <FormattedMessage id="pages.table.title.index" defaultMessage="Index" />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: (
        <FormattedMessage
          id="pages.flow.view.flowProperties.referenceToFlowPropertyDataSet"
          defaultMessage="Flow property"
        />
      ),
      dataIndex: 'referenceToFlowPropertyDataSet',
      sorter: false,
      search: false,
    },
    {
      title: (
        <FormattedMessage
          id="pages.flow.view.flowProperties.meanValue"
          defaultMessage="Mean value (of flow property)"
        />
      ),
      dataIndex: 'meanValue',
      sorter: false,
      search: false,
    },
    {
      title: (
        <FormattedMessage
          id="pages.flowproperty.referenceToReferenceUnitGroup"
          defaultMessage="Reference unit"
        />
      ),
      dataIndex: 'refUnitGroup',
      sorter: false,
      search: false,
      render: (_, row) => {
        return [
          <ReferenceUnit
            key={0}
            id={row.referenceToFlowPropertyDataSetId}
            idType={'flowproperty'}
            lang={lang}
          />,
        ];
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.process.exchange.quantitativeReference"
          defaultMessage="Quantitative reference"
        />
      ),
      dataIndex: 'quantitativeReference',
      sorter: false,
      search: false,
      render: (_, row) => {
        if (row.quantitativeReference) {
          return <CheckCircleOutlined />;
        }
        // return <CloseCircleOutlined />;
      },
    },
    {
      title: <FormattedMessage id="pages.table.title.option" defaultMessage="Option" />,
      dataIndex: 'option',
      search: false,
      render: (_, row) => {
        return [
          <Space size={'small'} key={0}>
            <PropertyView
              id={row.dataSetInternalID}
              data={propertyDataSource}
              lang={lang}
              buttonType={'icon'}
            />
            {/*<ProcessExchangeEdit
              id={row.dataSetInternalID}
              data={exchangeDataSource}
              lang={lang}
              buttonType={'icon'}
              actionRef={actionRefExchangeTable}
              onData={onExchangeData}
              setViewDrawerVisible={() => { }}
            />
            <ProcessExchangeDelete
              id={row.dataSetInternalID}
              data={exchangeDataSource}
              buttonType={'icon'}
              actionRef={actionRefExchangeTable}
              setViewDrawerVisible={() => { }}
              onData={onPropertyData}
            /> */}
          </Space>,
        ];
      },
    },
  ];
  const contentList: Record<string, React.ReactNode> = {
    flowInformation: (
      <>
        <Descriptions bordered size={'small'} column={1}>
          <Descriptions.Item
            key={0}
            label={<FormattedMessage id="pages.flow.view.flowInformation.id" defaultMessage="ID" />}
            labelStyle={{ width: '100px' }}
          >
            {initData?.flowInformation?.dataSetInformation?.['common:UUID'] ?? '-'}
          </Descriptions.Item>
        </Descriptions>
        <br />
        <Card
          size="small"
          title={
            <FormattedMessage id="pages.flow.view.flowInformation.name" defaultMessage="Name" />
          }
        >
          <Divider orientationMargin="0" orientation="left" plain>
            <FormattedMessage
              id="pages.flow.view.flowInformation.baseName"
              defaultMessage="Base name"
            />
          </Divider>
          <LangTextItemDescription
            data={initData?.flowInformation?.dataSetInformation?.['name']?.['baseName']}
          />
          <br />
          <Divider orientationMargin="0" orientation="left" plain>
            <FormattedMessage
              id="pages.flow.view.flowInformation.treatmentStandardsRoutes"
              defaultMessage="Treatment, standards, routes"
            />
          </Divider>
          <LangTextItemDescription
            data={
              initData?.flowInformation?.dataSetInformation?.name?.treatmentStandardsRoutes ?? '-'
            }
          />
          <br />
          <Divider orientationMargin="0" orientation="left" plain>
            <FormattedMessage
              id="pages.flow.view.flowInformation.mixAndLocationTypes"
              defaultMessage="Mix and Location Types"
            />
          </Divider>
          <LangTextItemDescription
            data={initData?.flowInformation?.dataSetInformation?.name?.mixAndLocationTypes ?? '-'}
          />
          <br />
          <Divider orientationMargin="0" orientation="left" plain>
            <FormattedMessage
              id="pages.flow.view.flowInformation.flowProperties"
              defaultMessage="Quantitative flow properties"
            />
          </Divider>
          <LangTextItemDescription
            data={initData?.flowInformation?.dataSetInformation?.name?.flowProperties ?? '-'}
          />
        </Card>
        <Divider orientationMargin="0" orientation="left" plain>
          <FormattedMessage
            id="pages.flow.view.flowInformation.synonyms"
            defaultMessage="Synonyms"
          />
        </Divider>
        <LangTextItemDescription
          data={initData?.flowInformation?.dataSetInformation?.['common:synonyms']}
        />
        <br />
        <Card
          size="small"
          title={
            <FormattedMessage
              id="pages.flow.view.flowInformation.classificationInformation"
              defaultMessage="Category and classification information"
            />
          }
        >
          <Descriptions bordered size={'small'} column={1}>
            <Descriptions.Item
              key={0}
              label={
                <FormattedMessage
                  id="pages.flow.view.modellingAndValidation.typeOfDataSet"
                  defaultMessage="Type of flow"
                />
              }
              labelStyle={{ width: '160px' }}
            >
              {flowTypeOptions.find(
                (i) => i.value === initData?.flowInformation?.LCIMethod?.typeOfDataSet,
              )?.label ??
                initData?.flowInformation?.LCIMethod?.typeOfDataSet ??
                '-'}
            </Descriptions.Item>
          </Descriptions>
          <br />
          <LevelTextItemDescription
            data={
              initData?.flowInformation?.dataSetInformation?.classificationInformation?.[
                'common:elementaryFlowCategorization'
              ]?.['common:category']?.['value']
            }
            lang={lang}
            categoryType={'Flow'}
            flowType={initData?.flowInformation?.LCIMethod?.typeOfDataSet}
          />
        </Card>
        <br />
        <Descriptions bordered size={'small'} column={1}>
          <Descriptions.Item
            key={0}
            label={
              <FormattedMessage
                id="pages.flow.view.flowInformation.CASNumber"
                defaultMessage="CAS Number"
              />
            }
            labelStyle={{ width: '140px' }}
          >
            {initData?.flowInformation?.dataSetInformation?.['CASNumber'] ?? '-'}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientationMargin="0" orientation="left" plain>
          <FormattedMessage
            id="pages.flow.view.flowInformation.generalComment"
            defaultMessage="General comment on data set"
          />
        </Divider>
        <LangTextItemDescription
          data={initData?.flowInformation?.dataSetInformation?.['common:generalComment']}
        />
        <br />
        <Descriptions bordered size={'small'} column={1}>
          <Descriptions.Item
            key={0}
            label={
              <FormattedMessage
                id="pages.flow.view.flowInformation.ECNumber"
                defaultMessage="EC Number"
              />
            }
            labelStyle={{ width: '140px' }}
          >
            {initData?.flowInformation?.dataSetInformation?.['common:other']?.['ecn:ECNumber'] ??
              '-'}
          </Descriptions.Item>
        </Descriptions>
        <br />

        {/* <Card size="small" title={'Quantitative Reference'}>
                    <Descriptions bordered size={'small'} column={1}>
                        <Descriptions.Item key={0} label="Reference To Reference Flow Property" labelStyle={{ width: '200px' }}>
                            {initData?.flowInformation?.quantitativeReference?.referenceToReferenceFlowProperty ?? '-'}
                        </Descriptions.Item>
                    </Descriptions>
                </Card> */}
        <Card
          size="small"
          title={
            <FormattedMessage
              id="pages.flow.view.flowInformation.geography"
              defaultMessage="Geography"
            />
          }
        >
          <LocationTextItemDescription
            lang={lang}
            data={initData?.flowInformation?.geography?.locationOfSupply ?? '-'}
            label={
              <FormattedMessage
                id="pages.flow.view.flowInformation.locationOfSupply"
                defaultMessage="Location of supply"
              />
            }
            labelStyle={{ width: '100px' }}
          />
        </Card>
      </>
    ),
    modellingAndValidation: (
      <>
        {/* <Descriptions bordered size={'small'} column={1}>
          <Descriptions.Item
            key={0}
            label={
              <FormattedMessage
                id="pages.flow.view.modellingAndValidation.lCIMethod:TypeOfDataSet"
                defaultMessage="LCI Method: Type Of Data Set"
              />
            }
            labelStyle={{ width: '220px' }}
          >
            {initData?.modellingAndValidation?.LCIMethod?.typeOfDataSet ?? '-'}
          </Descriptions.Item>
        </Descriptions>
        <br /> */}
        {/* <Card
          size="small"
          title={
            <FormattedMessage
              id="pages.flow.view.modellingAndValidation.complianceDeclarations"
              defaultMessage="Compliance Declarations"
            />
          }
        > */}
        <SourceSelectDescription
          data={
            initData?.modellingAndValidation?.complianceDeclarations?.compliance?.[
              'common:referenceToComplianceSystem'
            ]
          }
          title={
            <FormattedMessage
              id="pages.flow.view.modellingAndValidation.referenceToComplianceSystem"
              defaultMessage="Compliance system name"
            />
          }
          lang={lang}
        />
        <br />
        <Descriptions bordered size={'small'} column={1}>
          <Descriptions.Item
            key={0}
            label={
              <FormattedMessage
                id="pages.flow.view.modellingAndValidation.approvalOfOverallCompliance"
                defaultMessage="Approval of overall compliance"
              />
            }
            labelStyle={{ width: '240px' }}
          >
            {getComplianceLabel(
              initData?.modellingAndValidation?.complianceDeclarations?.compliance?.[
                'common:approvalOfOverallCompliance'
              ] ?? '-',
            )}
          </Descriptions.Item>
        </Descriptions>
        {/* <br />
        </Card> */}
      </>
    ),
    administrativeInformation: (
      <>
        <Card
          size="small"
          title={
            <FormattedMessage
              id="pages.flow.view.administrativeInformation.dataEntryBy"
              defaultMessage="Data entry by"
            />
          }
        >
          <Descriptions bordered size={'small'} column={1}>
            <Descriptions.Item
              key={0}
              label={
                <FormattedMessage
                  id="pages.flow.view.administrativeInformation.timeStamp"
                  defaultMessage="Time stamp (last saved)"
                />
              }
              labelStyle={{ width: '150px' }}
            >
              {initData?.administrativeInformation?.dataEntryBy?.['common:timeStamp'] ?? '-'}
            </Descriptions.Item>
          </Descriptions>
          <br />
          <SourceSelectDescription
            data={
              initData?.administrativeInformation?.dataEntryBy?.['common:referenceToDataSetFormat']
            }
            title={
              <FormattedMessage
                id="pages.flow.view.administrativeInformation.referenceToDataSetFormat"
                defaultMessage="Data set format(s)"
              />
            }
            lang={lang}
          />
        </Card>
        <br />
        <Card
          size="small"
          title={
            <FormattedMessage
              id="pages.flow.view.administrativeInformation.publicationAndOwnership"
              defaultMessage="Publication and ownership"
            />
          }
        >
          <Descriptions bordered size={'small'} column={1}>
            <Descriptions.Item
              key={0}
              label={
                <FormattedMessage
                  id="pages.flow.view.administrativeInformation.dataSetVersion"
                  defaultMessage="Data set version"
                />
              }
              labelStyle={{ width: '160px' }}
            >
              {initData?.administrativeInformation?.publicationAndOwnership?.[
                'common:dataSetVersion'
              ] ?? '-'}
            </Descriptions.Item>
          </Descriptions>
          <br />
          <Descriptions bordered size={'small'} column={1}>
            <Descriptions.Item
              key={0}
              label={
                <FormattedMessage
                  id="pages.flow.view.administrativeInformation.permanentDataSetURI"
                  defaultMessage="Permanent data set URI"
                />
              }
              labelStyle={{ width: '200px' }}
            >
              {initData?.administrativeInformation?.publicationAndOwnership?.[
                'common:permanentDataSetURI'
              ] ?? '-'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </>
    ),
    flowProperties: (
      <ProTable<FlowpropertyTabTable, ListPagination>
        search={false}
        pagination={{
          showSizeChanger: false,
          pageSize: 10,
        }}
        columns={propertyColumns}
        dataSource={genFlowPropertyTabTableData(propertyDataSource, lang)}
      />
    ),
  };

  const onView = () => {
    setDrawerVisible(true);
    setSpinning(true);
    getFlowDetail(id).then(async (result: any) => {
      const fromData = genFlowFromData(result.data?.json?.flowDataSet ?? {});
      setInitData({ ...fromData, id: id });
      setPropertyDataSource(fromData?.flowProperties?.flowProperty ?? []);
      setSpinning(false);
    });
  };

  return (
    <>
      {/* <Button shape="circle" icon={<ProfileOutlined />} size="small" onClick={onView} /> */}
      {buttonType === 'icon' ? (
        <Tooltip title={<FormattedMessage id="pages.button.view" defaultMessage="View" />}>
          <Button shape="circle" icon={<ProfileOutlined />} size="small" onClick={onView} />
        </Tooltip>
      ) : (
        <Button onClick={onView}>
          <FormattedMessage id="pages.button.view" defaultMessage="View" />
        </Button>
      )}

      <Drawer
        title={<FormattedMessage id="pages.flow.drawer.title.view" defaultMessage="View Flow" />}
        width="90%"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => setDrawerVisible(false)}
          />
        }
        maskClosable={true}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        <Spin spinning={spinning}>
          <Card
            style={{ width: '100%' }}
            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={onTabChange}
          >
            {contentList[activeTabKey]}
          </Card>
        </Spin>
      </Drawer>
    </>
  );
};

export default FlowsView;
