import * as ss from 'simple-statistics';
import data from '../Deidentified LTCF sample data with CAPs-duplicates.json';

export function getGroupedCAP_Data(field, dataArr = data) {
  const groupedData = {
    mean: 0,
    standardDeviation: 0,
    sampleVariance: 0,
    median: 0,
    mode: 0,

    categories: [],
  };

  const arrayData = extractArray(dataArr, field);

  labelsArray(arrayData).forEach(index => {
    groupedData.categories.push({ label: labelNumToName(index), y: 0 });
  });

  for (let i = 0; i < arrayData.length; i++) {
    const elem = arrayData[i];
    groupedData.categories[elem].y++;
  }

  let mean = ss.mean(arrayData);
  let standardDeviation = ss.standardDeviation(arrayData);
  let sampleVariance = ss.sampleVariance(arrayData);
  let median = ss.median(arrayData);
  let mode = ss.mode(arrayData);

  groupedData.mean = mean;
  groupedData.standardDeviation = standardDeviation;
  groupedData.sampleVariance = sampleVariance;
  groupedData.median = median;
  groupedData.mode = mode;

  return groupedData;
}

function labelsArray(arrayData) {
  let num = Math.max.apply(this, [...new Set(arrayData)]);
  let arr = [];
  for (let i = 0; i <= num; i++) {
    arr[i] = i;
  }

  return arr;
}

function labelNumToName(index) {
  if (index === 0) return 'Not Triggered';

  return `Trigger Level ${index}`;
}

export let consideredKeys = [
  'CAP_Activities',
  'CAP_ADL',
  'CAP_Behaviour',
  'CAP_Bowel',
  'CAP_Cardio',
  'CAP_Cognitive',
  'CAP_Communication',
  'CAP_Dehydration',
  'CAP_Delirium',
  'CAP_Medication',
  'CAP_Mood',
  'CAP_Nutrition',
  'CAP_Pain',
  'CAP_PhysicalActivity',
  'CAP_Prevention',
  'CAP_Restraint',
  'CAP_Social',
  'Hip fracture',
  'Other fracture',
  'Foot problems',
  'Easily Distracted',
  'Toilet use - performance',
  'CAP_Falls',
];

function correlationBetween(field1, field2) {
  return ss
    .sampleCorrelation(extractArray(data, field1), extractArray(data, field2))
    .toFixed(3);
}

function linRegBetween(field1, field2) {
  const arr1 = extractArray(data, field1);
  const arr2 = extractArray(data, field2);

  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    result.push([arr1[i], arr2[i]]);
  }

  return ss.linearRegression(result);
}

export function linRegAndOthers() {
  const obj = {};
  for (const e of consideredKeys) {
    if (e !== 'Recent Falls') {
      obj[e] = linRegBetween('Recent Falls', e);
    }
  }

  return obj;
}

function extractArray(dataArr, field) {
  return dataArr.map(e => e[field]);
}

export function corrFallAndOthers() {
  const obj = {};

  consideredKeys.forEach(e => {
    obj[e] = correlationBetween('Recent Falls', e);
  });

  return obj;
}

export function strongCorrFallAndOthers() {
  let obj = corrFallAndOthers();
  let newObj = {};
  for (const key in obj) {
    if (Math.abs(obj[key]) > 0.04) newObj[key] = obj[key];
  }

  return newObj;
}

export function generateRegressionData(x, y) {
  const obj = [];

  const arrX = extractArray(data, x);
  const arrY = extractArray(data, y);

  for (let i = 0; i < arrX.length; i++) {
    obj.push({ x: arrX[i], y: arrY[i] });
  }

  return obj;
}

export function taggingKeys(e) {
  const tags = {
    CAP_Activities: 'Daily Activity',
    CAP_ADL: 'Active Daily Life',
    CAP_Behaviour: 'Behavioral Conditions',
    CAP_Bowel: 'Bowel Conditions',
    CAP_Cardio: 'Cardio-Respiratory Conditions',
    CAP_Cognitive: 'Cognitive Loss',
    CAP_Communication: 'Communication With Others',
    CAP_Dehydration: 'Dehydration Level',
    CAP_Delirium: 'Delerium',
    CAP_Medication: 'On Medication',
    CAP_Mood: 'Mood Conditions',
    CAP_Nutrition: 'Nutrition Situation',
    CAP_Pain: 'Care for Pain',
    CAP_PhysicalActivity: 'Physical Activity',
    CAP_Prevention: 'Prevention Care',
    CAP_Restraint: 'Physical Restraint',
    CAP_Social: 'Social Count',
    'Hip fracture': 'Hip Fracture Count',
    'Other fracture': 'Other Fracture Count',
    'Foot problems': 'Foot Problems',
    'Easily Distracted': 'Easily Distracted',
    'Toilet use - performance': 'Performance of Toilet Use',
    CAP_Falls: 'Pre-Determined Fall Risk',
  };

  return tags[e];
}
