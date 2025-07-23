import { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { FormattedMessage } from 'umi';

export function getDataTitle(dataSource: string) {
  if (dataSource === 'my') {
    return <FormattedMessage id='menu.mydata' defaultMessage='Personal Domain' />;
  } else if (dataSource === 'tg') {
    return <FormattedMessage id='menu.tgdata' defaultMessage='Public Domain' />;
  } else if (dataSource === 'co') {
    return <FormattedMessage id='menu.codata' defaultMessage='Supply Chain Domain' />;
  } else if (dataSource === 'te') {
    return <FormattedMessage id='menu.tedata' defaultMessage='Enterprise Domain' />;
  }
  return '';
}

export function getAllVersionsColumns(columns: ProColumns<any>[], versionIndex: number) {
  const newColumns = [...columns];
  newColumns[versionIndex] = {
    ...newColumns[versionIndex],
    render: undefined,
  };

  newColumns.pop();
  return newColumns;
}

export function getRules(rules: any[]) {
  return rules.map((rule) => {
    let _rule = { ...rule };
    if (rule.hasOwnProperty('pattern')) {
      if (rule.pattern === 'dataSetVersion') {
        _rule.pattern = /^\d{2}\.\d{2}\.\d{3}$/;
      }
      if (rule.pattern === 'CASNumber') {
        _rule.pattern = /^\d{2,7}-\d{2}-\d$/;
      }
      if (rule.pattern === 'year') {
        _rule.pattern = /^[0-9]{4}$/;
      }
    }
    return {
      ..._rule,
      message: <FormattedMessage id={rule.messageKey} defaultMessage={rule.defaultMessage} />,
    };
  });
}

export const validateRefObjectId = (
  formRef: React.MutableRefObject<ProFormInstance | undefined>,
  name: string[],
  parentName?: string[],
) => {
  if (parentName) {
    formRef.current?.validateFields([[...parentName, ...name, '@refObjectId']]);
  } else {
    formRef.current?.validateFields([[...name, '@refObjectId']]);
  }
};

export const getLocalValueProps = (value: string) => ({
  value: value === 'en' ? 'English' : value === 'zh' ? '简体中文' : value,
});
