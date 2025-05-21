/* eslint-disable react/button-has-type */
import { Dice5, Minimize, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
// import 'tippy.js/dist/tippy.css';

import { useGraphEvent, useGraphInstance } from '@antv/xflow';
import { Button, Space, Tooltip } from 'antd';
import { FormattedMessage } from 'umi';
// import './styles/index.less';

export enum ControlEnum {
  ZoomTo = 'zoomTo',
  ZoomIn = 'zoomIn',
  ZoomOut = 'zoomOut',
  ZoomToFit = 'zoomToFit',
  ZoomToOrigin = 'zoomToOrigin',
}

const dropDownItems = [
  {
    key: '1',
    label: '50%',
  },
  {
    key: '2',
    label: '75%',
  },
  {
    key: '3',
    label: '100%',
  },
  {
    key: '4',
    label: '125%',
  },
  {
    key: '5',
    label: '150%',
  },
];

const ControlActionList = ['zoomTo', 'zoomIn', 'zoomOut', 'zoomToFit', 'zoomToOrigin'] as const;

type ControlAction = (typeof ControlActionList)[number];

interface ControlIProps {
  items: ControlAction[];
  direction?: 'horizontal' | 'vertical';
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

const Control = (props: ControlIProps) => {
  const { items } = props;

  const graph = useGraphInstance();

  const [zoom, setZoom] = useState(1);

  useGraphEvent('scale', ({ sx }: { sx: any }) => {
    setZoom(sx);
  });

  useEffect(() => {
    if (graph) {
      setZoom(graph.zoom());
    }
  }, [graph, props]);

  const ControlToolMap = {
    [ControlEnum.ZoomIn]: {
      label: <FormattedMessage id='pages.button.model.zoomIn' defaultMessage='Zoom In' />,
      icon: <Plus size={20} />,
    },
    [ControlEnum.ZoomOut]: {
      label: <FormattedMessage id='pages.button.model.zoomOut' defaultMessage='Zoom Out' />,
      icon: <Minus size={20} />,
    },
    [ControlEnum.ZoomTo]: {
      label: <FormattedMessage id='pages.button.model.zoomTo' defaultMessage='Zoom To' />,
      icon: <Plus size={20} />,
    },
    [ControlEnum.ZoomToFit]: {
      label: <FormattedMessage id='pages.button.model.zoomToFit' defaultMessage='Zoom To Fit' />,
      icon: <Minimize />,
    },
    [ControlEnum.ZoomToOrigin]: {
      label: (
        <FormattedMessage id='pages.button.model.zoomToOrigin' defaultMessage='Zoom To Origin' />
      ),
      icon: <Dice5 size={20} />,
    },
  };

  const changeZoom = (type: ControlAction, args?: string) => {
    if (!graph) return;
    const key = parseInt(args || '1', 10);
    const zoomNum = (0.25 * (key + 1)) as number;
    switch (type) {
      case ControlEnum.ZoomIn:
        if (zoom < 1.5) {
          graph.zoom(0.25);
        }
        break;
      case ControlEnum.ZoomOut:
        if (zoom > 0.5) {
          graph.zoom(-0.25);
        }
        break;
      case ControlEnum.ZoomToFit:
        graph.zoomToFit({ maxScale: 1 });
        break;
      case ControlEnum.ZoomToOrigin:
        graph.zoomTo(1);
        break;
      case ControlEnum.ZoomTo:
        graph.zoomTo(zoomNum);
        break;
      default:
        break;
    }
    setZoom(graph.zoom());
  };

  const isToolButtonEnabled = (type: ControlEnum) => {
    if (type === ControlEnum.ZoomIn) {
      return zoom < 1.5;
    } else if (type === ControlEnum.ZoomOut) {
      return zoom > 0.51;
    }
    return true;
  };

  return (
    <Space
      direction='vertical'
      size={'middle'}
      style={{ position: 'absolute', right: 13, bottom: 5 }}
    >
      {items.map((tool) => {
        if (tool === 'zoomTo') {
          return (
            <Tooltip
              key={tool}
              title={
                <Space direction='vertical' size={'small'}>
                  {dropDownItems.map((item) => {
                    return (
                      <Button
                        key={item.key}
                        style={{ width: '50px' }}
                        onClick={() => changeZoom(tool, item.key)}
                      >
                        {item.label}
                      </Button>
                    );
                  })}
                </Space>
              }
              placement='left'
            >
              {/* <button className="dropDownBtn">{`${Math.floor(zoom * 100)}%`}</button> */}
              <Button
                type='primary'
                size='small'
                onClick={() => changeZoom(tool)}
                disabled={!isToolButtonEnabled(tool as ControlEnum)}
                style={{ fontSize: '8px', padding: '0', width: '24px', boxShadow: 'none' }}
              >
                {`${Math.floor(zoom * 100)}%`}
              </Button>
            </Tooltip>
          );
        } else if (ControlActionList.includes(tool)) {
          return (
            <Tooltip key={tool} title={ControlToolMap[tool].label} placement='left'>
              <Button
                type='primary'
                size='small'
                style={{ boxShadow: 'none' }}
                icon={ControlToolMap[tool].icon}
                onClick={() => changeZoom(tool)}
                disabled={!isToolButtonEnabled(tool as ControlEnum)}
              />
            </Tooltip>
          );
        } else {
          return null;
        }
      })}
    </Space>
  );
};

export { Control };
