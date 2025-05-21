import { FormattedMessage } from '@umijs/max';
import { Form, Input, Modal, Select } from 'antd';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';

interface UnitConvertProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (value: number) => void;
  units: { name: string; meanValue: number }[];
  value?: number;
  targetUnit: string;
}

const UnitConvert: React.FC<UnitConvertProps> = ({
  visible,
  onCancel,
  onOk,
  units,
  value,
  targetUnit,
}) => {
  const [form] = Form.useForm();
  const [result, setResult] = useState<number>();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        value: value,
      });
    }
  }, [visible, value]);

  const handleUnitChange = () => {
    const values = form.getFieldsValue();
    if (values.value && values.unit) {
      const selectedUnit = units.find((u) => u.name === values.unit);
      if (selectedUnit) {
        setResult(new BigNumber(values.value).times(selectedUnit.meanValue).toNumber());
      }
    }
  };

  const handleReset = () => {
    form.resetFields();
    setResult(undefined);
  };

  const handleClose = () => {
    handleReset();
    onCancel();
  };

  const handleOk = async () => {
    await form.validateFields();
    if (result) {
      onOk(result);
    }
    handleClose();
  };

  return (
    <Modal
      title={
        <FormattedMessage id='pages.process.unitConvert.title' defaultMessage='Unit Conversion' />
      }
      open={visible}
      zIndex={2000}
      onCancel={handleClose}
      onOk={handleOk}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          label={<FormattedMessage id='pages.process.unitConvert.value' defaultMessage='Value' />}
          name='value'
          rules={[{ required: true }]}
        >
          <Input type='number' onChange={handleUnitChange} />
        </Form.Item>

        <Form.Item
          label={<FormattedMessage id='pages.process.unitConvert.unit' defaultMessage='Unit' />}
          name='unit'
          rules={[{ required: true }]}
        >
          <Select onChange={handleUnitChange}>
            {units &&
              units?.length &&
              units.map((unit) => (
                <Select.Option key={unit.name} value={unit.name}>
                  {unit.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={<FormattedMessage id='pages.process.unitConvert.result' defaultMessage='Result' />}
        >
          <Input addonAfter={targetUnit} value={result} disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UnitConvert;
