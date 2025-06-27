import { QuantitativeReferenceIcon } from '@/components';
import AlignedNumber from '@/components/AlignedNumber';
import { getLangText } from '@/services/general/util';
import { ProcessExchangeTable } from '@/services/processes/data';
import { ProColumns } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Tooltip } from 'antd';

export function getExchangeColumns(lang: string): ProColumns<ProcessExchangeTable>[] {
  return [
    {
      title: <FormattedMessage id='pages.table.title.index' defaultMessage='Index' />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    // {
    //   title: <FormattedMessage id="processExchange.dataSetInternalID" defaultMessage="DataSet Internal ID" />,
    //   dataIndex: 'dataSetInternalID',
    //   search: false,
    // },
    // {
    //   title: (
    //     <FormattedMessage
    //       id="pages.process.exchange.exchangeDirection"
    //       defaultMessage="Direction"
    //     />
    //   ),
    //   dataIndex: 'exchangeDirection',
    //   sorter: false,
    //   search: false,
    // },
    {
      title: <FormattedMessage id='processExchange.referenceToFlowDataSet' defaultMessage='Flow' />,
      dataIndex: 'referenceToFlowDataSet',
      sorter: false,
      search: false,
      render: (_, row) => [
        <Tooltip key={0} placement='topLeft' title={row.generalComment}>
          {row.referenceToFlowDataSet}
        </Tooltip>,
      ],
    },
    {
      title: <FormattedMessage id='pages.table.title.version' defaultMessage='Version' />,
      dataIndex: 'referenceToFlowDataSetVersion',
      sorter: false,
      search: false,
    },
    {
      title: (
        <FormattedMessage id='pages.process.exchange.meanAmount' defaultMessage='Mean amount' />
      ),
      dataIndex: 'meanAmount',
      align: 'right',
      sorter: false,
      search: false,
      width: 140,
      render: (_: any, record: any) => {
        return <AlignedNumber number={record.meanAmount} />;
      },
    },
    {
      title: (
        <FormattedMessage
          id='pages.process.exchange.resultingAmount'
          defaultMessage='Resulting amount'
        />
      ),
      dataIndex: 'resultingAmount',
      align: 'right',
      sorter: false,
      search: false,
      width: 140,
      render: (_: any, record: any) => {
        return <AlignedNumber number={record.resultingAmount} />;
      },
    },
    {
      title: (
        <FormattedMessage
          id='pages.flowproperty.referenceToReferenceUnitGroup'
          defaultMessage='Reference unit'
        />
      ),
      dataIndex: 'refUnitGroup',
      sorter: false,
      search: false,
      render: (_, row) => {
        return [
          // <ReferenceUnit
          //   key={0}
          //   id={row.referenceToFlowDataSetId}
          //   version={row.referenceToFlowDataSetVersion}
          //   idType={'flow'}
          //   lang={lang}
          // />,
          <span key={1}>
            {getLangText(row.refUnitRes?.name, lang)} (
            <Tooltip
              placement='topLeft'
              title={getLangText(row.refUnitRes?.refUnitGeneralComment, lang)}
            >
              {row.refUnitRes?.refUnitName}
            </Tooltip>
            )
          </span>,
        ];
      },
    },

    {
      title: (
        <FormattedMessage
          id='pages.process.exchange.dataDerivationTypeStatus'
          defaultMessage='Data derivation type / status'
        />
      ),
      dataIndex: 'dataDerivationTypeStatus',
      sorter: false,
      search: false,
    },
    {
      title: (
        <FormattedMessage
          id='pages.process.exchange.quantitativeReference'
          defaultMessage='Quantitative reference'
        />
      ),
      dataIndex: 'quantitativeReference',
      sorter: false,
      search: false,
      render: (_, row) => {
        return <QuantitativeReferenceIcon value={row.quantitativeReference} />;
      },
    },
    {
      title: (
        <FormattedMessage id='pages.process.exchange.reviewType' defaultMessage='Review type' />
      ),
      dataIndex: 'reviewType',
      sorter: false,
      search: false,
      width: 80,
      render: (_, row) => {
        return (
          <>
            {row?.stateCode === 100 || row?.stateCode === 200 ? (
              <FormattedMessage
                id='pages.process.exchange.reviewType.reviewed'
                defaultMessage='Reviewed'
              />
            ) : typeof row?.stateCode === 'number' ? (
              <FormattedMessage
                id='pages.process.exchange.reviewType.unreviewed'
                defaultMessage='Unreviewed'
              />
            ) : (
              '-'
            )}
          </>
        );
      },
    },
  ];
}
