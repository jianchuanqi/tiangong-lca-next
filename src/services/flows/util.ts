import {
  classificationToJsonList,
  classificationToStringList,
  getLangJson,
  getLangList,
  getLangText,
  jsonToList,
  removeEmptyObjects,
} from '../general/util';

export function genFlowJsonOrdered(id: string, data: any) {
  let quantitativeReference = {};
  const flowProperty =
    data?.flowProperties?.flowProperty?.map((item: any) => {
      if (item?.quantitativeReference) {
        quantitativeReference = {
          referenceToReferenceFlowProperty: item?.['@dataSetInternalID'],
        };
      }
      return {
        '@dataSetInternalID': item?.['@dataSetInternalID'],
        referenceToFlowPropertyDataSet: {
          '@refObjectId': item?.referenceToFlowPropertyDataSet?.['@refObjectId'],
          '@type': item?.referenceToFlowPropertyDataSet?.['@type'],
          '@uri': item?.referenceToFlowPropertyDataSet?.['@uri'],
          '@version': item?.referenceToFlowPropertyDataSet?.['@version'],
          'common:shortDescription': getLangJson(
            item?.referenceToFlowPropertyDataSet?.['common:shortDescription'],
          ),
        },
        meanValue: item?.['meanValue'],
        minimumValue: item?.['minimumValue'],
        maximumValue: item?.['maximumValue'],
        uncertaintyDistributionType: item?.['uncertaintyDistributionType'],
        relativeStandardDeviation95In: item?.['relativeStandardDeviation95In'],
        dataDerivationTypeStatus: item?.['dataDerivationTypeStatus'],
        ['common:generalComment']: getLangJson(item?.['common:generalComment']),
      };
    }) ?? [];
  let flowPropertyJson: any = {};
  if (flowProperty.length > 1) {
    flowPropertyJson = flowProperty;
  } else if (flowProperty.length === 1) {
    flowPropertyJson = flowProperty[0];
  } else {
    flowPropertyJson = {};
  }

  let classificationInformation = {};
  if (data?.modellingAndValidation?.LCIMethod?.typeOfDataSet === 'Elementary flow') {
    classificationInformation = {
      'common:elementaryFlowCategorization': {
        'common:category': classificationToJsonList(
          data?.flowInformation?.dataSetInformation?.classificationInformation?.[
            'common:elementaryFlowCategorization'
          ]?.['common:category'],
        ),
      },
    };
  } else {
    classificationInformation = {
      'common:classification': {
        'common:class': classificationToJsonList(
          data?.flowInformation?.dataSetInformation?.classificationInformation?.[
            'common:classification'
          ]?.['common:class'],
        ),
      },
    };
  }

  return removeEmptyObjects({
    flowDataSet: {
      // '@xmlns': oldData.flowDataSet?.['@xmlns'],
      // '@xmlns:common': oldData.flowDataSet?.['@xmlns:common'],
      // '@xmlns:ecn': oldData.flowDataSet?.['@xmlns:ecn'],
      // '@xmlns:xsi': oldData.flowDataSet?.['@xmlns:xsi'],
      // '@version': oldData.flowDataSet?.['@version'],
      // '@xsi:schemaLocation': oldData.flowDataSet?.['@xsi:schemaLocation'],

      '@xmlns': 'http://lca.jrc.it/ILCD/Flow',
      '@xmlns:common': 'http://lca.jrc.it/ILCD/Common',
      '@xmlns:ecn': 'http://eplca.jrc.ec.europa.eu/ILCD/Extensions/2018/ECNumber',
      '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '@version': '1.1',
      '@locations': '../ILCDLocations.xml',
      '@xsi:schemaLocation': 'http://lca.jrc.it/ILCD/Flow ../../schemas/ILCD_FlowDataSet.xsd',

      flowInformation: {
        dataSetInformation: {
          'common:UUID': id,
          name: {
            baseName: getLangJson(
              data?.flowInformation?.dataSetInformation?.['name']?.['baseName'],
            ),
            treatmentStandardsRoutes: getLangJson(
              data?.flowInformation?.dataSetInformation?.name?.treatmentStandardsRoutes,
            ),
            mixAndLocationTypes: getLangJson(
              data?.flowInformation?.dataSetInformation?.name?.mixAndLocationTypes,
            ),
            flowProperties: getLangJson(
              data?.flowInformation?.dataSetInformation?.name?.flowProperties,
            ),
          },
          'common:synonyms': getLangJson(
            data?.flowInformation?.dataSetInformation?.['common:synonyms'],
          ),
          classificationInformation: classificationInformation,
          CASNumber: data?.flowInformation?.dataSetInformation?.['CASNumber'],
          sumFormula: data?.flowInformation?.dataSetInformation?.['sumFormula'],
          'common:generalComment': getLangJson(
            data?.flowInformation?.dataSetInformation?.['common:generalComment'],
          ),
          'common:other': {
            'ecn:ECNumber':
              data?.flowInformation?.dataSetInformation?.['common:other']?.['ecn:ECNumber'],
          },
        },
        quantitativeReference: quantitativeReference,
        geography: {
          locationOfSupply:
            data?.flowInformation?.geography?.locationOfSupply === 'NULL'
              ? {}
              : (data?.flowInformation?.geography?.locationOfSupply ?? {}),
        },
        technology: {
          technologicalApplicability: getLangJson(
            data?.flowInformation?.technology?.technologicalApplicability,
          ),
          referenceToTechnicalSpecification: {
            '@type':
              data?.flowInformation?.technology?.referenceToTechnicalSpecification?.['@type'] ?? {},
            '@refObjectId':
              data?.flowInformation?.technology?.referenceToTechnicalSpecification?.[
                '@refObjectId'
              ] ?? {},
            '@version':
              data?.flowInformation?.technology?.referenceToTechnicalSpecification?.['@version'] ??
              {},
            '@uri':
              data?.flowInformation?.technology?.referenceToTechnicalSpecification?.['@uri'] ?? {},
            'common:shortDescription': getLangJson(
              data?.flowInformation?.technology?.referenceToTechnicalSpecification?.[
                'common:shortDescription'
              ],
            ),
          },
        },
      },
      modellingAndValidation: {
        LCIMethod: {
          typeOfDataSet: data?.modellingAndValidation?.LCIMethod?.typeOfDataSet,
        },
        complianceDeclarations: {
          compliance: {
            'common:referenceToComplianceSystem': {
              '@refObjectId':
                data?.modellingAndValidation?.complianceDeclarations?.compliance?.[
                  'common:referenceToComplianceSystem'
                ]?.['@refObjectId'],
              '@version':
                data?.modellingAndValidation?.complianceDeclarations?.compliance?.[
                  'common:referenceToComplianceSystem'
                ]?.['@version'],
              '@type':
                data?.modellingAndValidation?.complianceDeclarations?.compliance?.[
                  'common:referenceToComplianceSystem'
                ]?.['@type'],
              '@uri':
                data?.modellingAndValidation?.complianceDeclarations?.compliance?.[
                  'common:referenceToComplianceSystem'
                ]?.['@uri'],
              'common:shortDescription': getLangJson(
                data?.modellingAndValidation?.complianceDeclarations?.compliance?.[
                  'common:referenceToComplianceSystem'
                ]?.['common:shortDescription'],
              ),
            },
            'common:approvalOfOverallCompliance':
              data?.modellingAndValidation?.complianceDeclarations?.compliance?.[
                'common:approvalOfOverallCompliance'
              ],
          },
        },
      },
      administrativeInformation: {
        dataEntryBy: {
          'common:timeStamp': data?.administrativeInformation?.dataEntryBy?.['common:timeStamp'],
          'common:referenceToDataSetFormat': {
            '@refObjectId':
              data?.administrativeInformation?.dataEntryBy?.['common:referenceToDataSetFormat']?.[
                '@refObjectId'
              ],
            '@version':
              data?.administrativeInformation?.dataEntryBy?.['common:referenceToDataSetFormat']?.[
                '@version'
              ],
            '@type':
              data?.administrativeInformation?.dataEntryBy?.['common:referenceToDataSetFormat']?.[
                '@type'
              ],
            '@uri':
              data?.administrativeInformation?.dataEntryBy?.['common:referenceToDataSetFormat']?.[
                '@uri'
              ],
            'common:shortDescription': getLangJson(
              data?.administrativeInformation?.dataEntryBy?.['common:referenceToDataSetFormat']?.[
                'common:shortDescription'
              ],
            ),
          },
          'common:referenceToPersonOrEntityEnteringTheData': {
            '@refObjectId':
              data?.administrativeInformation?.dataEntryBy?.[
                'common:referenceToPersonOrEntityEnteringTheData'
              ]?.['@refObjectId'],
            '@type':
              data?.administrativeInformation?.dataEntryBy?.[
                'common:referenceToPersonOrEntityEnteringTheData'
              ]?.['@type'],
            '@uri':
              data?.administrativeInformation?.dataEntryBy?.[
                'common:referenceToPersonOrEntityEnteringTheData'
              ]?.['@uri'],
            '@version':
              data?.administrativeInformation?.dataEntryBy?.[
                'common:referenceToPersonOrEntityEnteringTheData'
              ]?.['@version'],
            'common:shortDescription': getLangJson(
              data?.administrativeInformation?.dataEntryBy?.[
                'common:referenceToPersonOrEntityEnteringTheData'
              ]?.['common:shortDescription'],
            ),
          },
        },
        publicationAndOwnership: {
          'common:dataSetVersion':
            data?.administrativeInformation?.publicationAndOwnership?.['common:dataSetVersion'],
          'common:permanentDataSetURI':
            data?.administrativeInformation?.publicationAndOwnership?.[
              'common:permanentDataSetURI'
            ],
          'common:referenceToOwnershipOfDataSet': {
            '@refObjectId':
              data?.administrativeInformation?.publicationAndOwnership?.[
                'common:referenceToOwnershipOfDataSet'
              ]?.['@refObjectId'],
            '@type':
              data?.administrativeInformation?.publicationAndOwnership?.[
                'common:referenceToOwnershipOfDataSet'
              ]?.['@type'],
            '@uri':
              data?.administrativeInformation?.publicationAndOwnership?.[
                'common:referenceToOwnershipOfDataSet'
              ]?.['@uri'],
            '@version':
              data?.administrativeInformation?.publicationAndOwnership?.[
                'common:referenceToOwnershipOfDataSet'
              ]?.['@version'],
            'common:shortDescription': getLangJson(
              data?.administrativeInformation?.publicationAndOwnership?.[
                'common:referenceToOwnershipOfDataSet'
              ]?.['common:shortDescription'],
            ),
          },
          'common:referenceToPrecedingDataSetVersion': {
            '@refObjectId':
              data?.administrativeInformation?.publicationAndOwnership?.[
                'common:referenceToPrecedingDataSetVersion'
              ]?.['@refObjectId'],
            '@type':
              data?.administrativeInformation?.publicationAndOwnership?.[
                'common:referenceToPrecedingDataSetVersion'
              ]?.['@type'],
            '@uri':
              data?.administrativeInformation?.publicationAndOwnership?.[
                'common:referenceToPrecedingDataSetVersion'
              ]?.['@uri'],
            '@version':
              data?.administrativeInformation?.publicationAndOwnership?.[
                'common:referenceToPrecedingDataSetVersion'
              ]?.['@version'],
            'common:shortDescription': getLangJson(
              data?.administrativeInformation?.publicationAndOwnership?.[
                'common:referenceToPrecedingDataSetVersion'
              ]?.['common:shortDescription'],
            ),
          },
        },
      },
      flowProperties: {
        flowProperty: flowPropertyJson,
      },
    },
  });
}

export function genFlowFromData(data: any) {
  const flowProperty = data?.flowProperties?.flowProperty ?? [];
  let flowPropertyList = [];
  if (!Array.isArray(flowProperty)) {
    flowPropertyList = [flowProperty];
  } else {
    flowPropertyList = flowProperty;
  }

  let classificationInformation = {};
  if (data?.modellingAndValidation?.LCIMethod?.typeOfDataSet === 'Elementary flow') {
    classificationInformation = {
      'common:elementaryFlowCategorization': {
        'common:category': classificationToStringList(
          data?.flowInformation?.dataSetInformation?.classificationInformation?.[
            'common:elementaryFlowCategorization'
          ]?.['common:category'],
        ),
      },
    };
  } else {
    classificationInformation = {
      'common:classification': {
        'common:class': classificationToStringList(
          data?.flowInformation?.dataSetInformation?.classificationInformation?.[
            'common:classification'
          ]?.['common:class'],
        ),
      },
    };
  }

  return removeEmptyObjects({
    flowInformation: {
      dataSetInformation: {
        'common:UUID': data?.flowInformation?.dataSetInformation?.['common:UUID'],
        name: {
          baseName: getLangList(data?.flowInformation?.dataSetInformation?.['name']?.['baseName']),
          treatmentStandardsRoutes: getLangList(
            data?.flowInformation?.dataSetInformation?.name?.treatmentStandardsRoutes,
          ),
          mixAndLocationTypes: getLangList(
            data?.flowInformation?.dataSetInformation?.name?.mixAndLocationTypes,
          ),
          flowProperties: getLangList(
            data?.flowInformation?.dataSetInformation?.name?.flowProperties,
          ),
        },
        'common:synonyms': getLangList(
          data?.flowInformation?.dataSetInformation?.['common:synonyms'],
        ),
        classificationInformation: classificationInformation,
        CASNumber: data?.flowInformation?.dataSetInformation?.['CASNumber'],
        sumFormula: data?.flowInformation?.dataSetInformation?.['sumFormula'],
        'common:generalComment': getLangList(
          data?.flowInformation?.dataSetInformation?.['common:generalComment'],
        ),
        'common:other': {
          'ecn:ECNumber':
            data?.flowInformation?.dataSetInformation?.['common:other']?.['ecn:ECNumber'],
        },
      },
      quantitativeReference: {
        referenceToReferenceFlowProperty:
          data?.flowInformation?.quantitativeReference?.referenceToReferenceFlowProperty,
      },
      geography: {
        locationOfSupply: data?.flowInformation?.geography?.locationOfSupply,
      },
      technology: {
        technologicalApplicability: getLangList(
          data?.flowInformation?.technology?.technologicalApplicability,
        ),
        referenceToTechnicalSpecification: {
          '@type':
            data?.flowInformation?.technology?.referenceToTechnicalSpecification?.['@type'] ?? {},
          '@refObjectId':
            data?.flowInformation?.technology?.referenceToTechnicalSpecification?.[
              '@refObjectId'
            ] ?? {},
          '@version':
            data?.flowInformation?.technology?.referenceToTechnicalSpecification?.['@version'] ??
            {},
          '@uri':
            data?.flowInformation?.technology?.referenceToTechnicalSpecification?.['@uri'] ?? {},
          'common:shortDescription': getLangList(
            data?.flowInformation?.technology?.referenceToTechnicalSpecification?.[
              'common:shortDescription'
            ],
          ),
        },
      },
    },
    modellingAndValidation: {
      LCIMethod: {
        typeOfDataSet: data?.modellingAndValidation?.LCIMethod?.typeOfDataSet,
      },
      complianceDeclarations: {
        compliance: {
          'common:referenceToComplianceSystem': {
            '@refObjectId':
              data?.modellingAndValidation?.complianceDeclarations?.compliance?.[
                'common:referenceToComplianceSystem'
              ]?.['@refObjectId'],
            '@version':
              data?.modellingAndValidation?.complianceDeclarations?.compliance?.[
                'common:referenceToComplianceSystem'
              ]?.['@version'],
            '@type':
              data?.modellingAndValidation?.complianceDeclarations?.compliance?.[
                'common:referenceToComplianceSystem'
              ]?.['@type'],
            '@uri':
              data?.modellingAndValidation?.complianceDeclarations?.compliance?.[
                'common:referenceToComplianceSystem'
              ]?.['@uri'],
            'common:shortDescription': getLangList(
              data?.modellingAndValidation?.complianceDeclarations?.compliance?.[
                'common:referenceToComplianceSystem'
              ]?.['common:shortDescription'],
            ),
          },
          'common:approvalOfOverallCompliance':
            data?.modellingAndValidation?.complianceDeclarations?.compliance?.[
              'common:approvalOfOverallCompliance'
            ],
        },
      },
    },
    administrativeInformation: {
      dataEntryBy: {
        'common:timeStamp': data?.administrativeInformation?.dataEntryBy?.['common:timeStamp'],
        'common:referenceToDataSetFormat': {
          '@refObjectId':
            data?.administrativeInformation?.dataEntryBy?.['common:referenceToDataSetFormat']?.[
              '@refObjectId'
            ],
          '@version':
            data?.administrativeInformation?.dataEntryBy?.['common:referenceToDataSetFormat']?.[
              '@version'
            ],
          '@type':
            data?.administrativeInformation?.dataEntryBy?.['common:referenceToDataSetFormat']?.[
              '@type'
            ],
          '@uri':
            data?.administrativeInformation?.dataEntryBy?.['common:referenceToDataSetFormat']?.[
              '@uri'
            ],
          'common:shortDescription': getLangList(
            data?.administrativeInformation?.dataEntryBy?.['common:referenceToDataSetFormat']?.[
              'common:shortDescription'
            ],
          ),
        },
        'common:referenceToPersonOrEntityEnteringTheData': {
          '@refObjectId':
            data?.administrativeInformation?.dataEntryBy?.[
              'common:referenceToPersonOrEntityEnteringTheData'
            ]?.['@refObjectId'],
          '@type':
            data?.administrativeInformation?.dataEntryBy?.[
              'common:referenceToPersonOrEntityEnteringTheData'
            ]?.['@type'],
          '@uri':
            data?.administrativeInformation?.dataEntryBy?.[
              'common:referenceToPersonOrEntityEnteringTheData'
            ]?.['@uri'],
          '@version':
            data?.administrativeInformation?.dataEntryBy?.[
              'common:referenceToPersonOrEntityEnteringTheData'
            ]?.['@version'],
          'common:shortDescription': getLangList(
            data?.administrativeInformation?.dataEntryBy?.[
              'common:referenceToPersonOrEntityEnteringTheData'
            ]?.['common:shortDescription'],
          ),
        },
      },
      publicationAndOwnership: {
        'common:dataSetVersion':
          data?.administrativeInformation?.publicationAndOwnership?.['common:dataSetVersion'],
        'common:permanentDataSetURI':
          data?.administrativeInformation?.publicationAndOwnership?.['common:permanentDataSetURI'],
        'common:referenceToOwnershipOfDataSet': {
          '@refObjectId':
            data?.administrativeInformation?.publicationAndOwnership?.[
              'common:referenceToOwnershipOfDataSet'
            ]?.['@refObjectId'],
          '@type':
            data?.administrativeInformation?.publicationAndOwnership?.[
              'common:referenceToOwnershipOfDataSet'
            ]?.['@type'],
          '@uri':
            data?.administrativeInformation?.publicationAndOwnership?.[
              'common:referenceToOwnershipOfDataSet'
            ]?.['@uri'],
          '@version':
            data?.administrativeInformation?.publicationAndOwnership?.[
              'common:referenceToOwnershipOfDataSet'
            ]?.['@version'],
          'common:shortDescription': getLangList(
            data?.administrativeInformation?.publicationAndOwnership?.[
              'common:referenceToOwnershipOfDataSet'
            ]?.['common:shortDescription'],
          ),
        },
        'common:referenceToPrecedingDataSetVersion': {
          '@refObjectId':
            data?.administrativeInformation?.publicationAndOwnership?.[
              'common:referenceToPrecedingDataSetVersion'
            ]?.['@refObjectId'],
          '@type':
            data?.administrativeInformation?.publicationAndOwnership?.[
              'common:referenceToPrecedingDataSetVersion'
            ]?.['@type'],
          '@uri':
            data?.administrativeInformation?.publicationAndOwnership?.[
              'common:referenceToPrecedingDataSetVersion'
            ]?.['@uri'],
          '@version':
            data?.administrativeInformation?.publicationAndOwnership?.[
              'common:referenceToPrecedingDataSetVersion'
            ]?.['@version'],
          'common:shortDescription': getLangList(
            data?.administrativeInformation?.publicationAndOwnership?.[
              'common:referenceToPrecedingDataSetVersion'
            ]?.['common:shortDescription'],
          ),
        },
      },
    },
    flowProperties: {
      flowProperty: flowPropertyList?.map((item: any) => {
        return {
          '@dataSetInternalID': item?.['@dataSetInternalID'],
          referenceToFlowPropertyDataSet: {
            '@refObjectId': item?.referenceToFlowPropertyDataSet?.['@refObjectId'],
            '@type': item?.referenceToFlowPropertyDataSet?.['@type'],
            '@uri': item?.referenceToFlowPropertyDataSet?.['@uri'],
            '@version': item?.referenceToFlowPropertyDataSet?.['@version'],
            'common:shortDescription': getLangList(
              item?.referenceToFlowPropertyDataSet?.['common:shortDescription'],
            ),
          },
          meanValue: item?.['meanValue'],
          minimumValue: item?.['minimumValue'],
          maximumValue: item?.['maximumValue'],
          uncertaintyDistributionType: item?.['uncertaintyDistributionType'],
          relativeStandardDeviation95In: item?.['relativeStandardDeviation95In'],
          dataDerivationTypeStatus: item?.['dataDerivationTypeStatus'],
          ['common:generalComment']: getLangJson(item?.['common:generalComment']),
          quantitativeReference:
            item?.['@dataSetInternalID'] ===
            data?.flowInformation?.quantitativeReference?.referenceToReferenceFlowProperty
              ? true
              : false,
        };
      }),
    },
  });
}

export function genFlowPropertyTabTableData(data: any, lang: string) {
  if (data) {
    let dataList = [];
    if (!Array.isArray(data)) {
      dataList = [data];
    } else {
      if (data.length === 0) {
        return [];
      }
      dataList = data;
    }

    return dataList?.map((item: any) => {
      return removeEmptyObjects({
        key: item?.['@dataSetInternalID'] ?? '-',
        dataSetInternalID: item?.['@dataSetInternalID'] ?? '-',
        referenceToFlowPropertyDataSetId:
          item?.referenceToFlowPropertyDataSet?.['@refObjectId'] ?? '-',
        referenceToFlowPropertyDataSetVersion:
          item?.referenceToFlowPropertyDataSet?.['@version'] ?? '-',
        referenceToFlowPropertyDataSet: getLangText(
          item?.referenceToFlowPropertyDataSet?.['common:shortDescription'],
          lang,
        ),
        meanValue: item?.['meanValue'],
        quantitativeReference: item?.quantitativeReference ?? false,
        location: item?.locationOfSupply ?? '-',
        minimumValue: item?.['minimumValue'],
        maximumValue: item?.['maximumValue'],
        uncertaintyDistributionType: item?.['uncertaintyDistributionType'],
        relativeStandardDeviation95In: item?.['relativeStandardDeviation95In'],
        dataDerivationTypeStatus: item?.['dataDerivationTypeStatus'],
        ['common:generalComment']: getLangText(item?.['common:generalComment'], lang),
      });
    });
  }
  return [];
}

export function genFlowName(name: any, lang: string) {
  const baseName = getLangText(name?.baseName, lang);
  const treatmentStandardsRoutes = getLangText(name?.treatmentStandardsRoutes, lang);
  const mixAndLocationTypes = getLangText(name?.mixAndLocationTypes, lang);
  const flowProperties = getLangText(name?.flowProperties, lang);
  const nameStr = (
    baseName +
    '; ' +
    treatmentStandardsRoutes +
    '; ' +
    mixAndLocationTypes +
    '; ' +
    flowProperties +
    '; '
  ).replace(/-; /g, '');
  if (nameStr.endsWith('; ')) {
    return nameStr.slice(0, -2);
  }
  if (nameStr.length === 0) {
    return '-';
  }
}

export function genFlowNameJson(name: any) {
  const nameJson = jsonToList(name?.baseName)?.map((item: any) => {
    return {
      '@xml:lang': item?.['@xml:lang'],
      '#text': genFlowName(name, item?.['@xml:lang']),
    };
  });
  return nameJson;
}
