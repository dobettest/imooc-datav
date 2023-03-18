import request from '@/utils/request';
import { type GenericAbortSignal } from 'axios';

export function getWordcloud(signal?: GenericAbortSignal) {
  return request({
    url: '/screen/wordcloud',
    method: 'get',
    signal
  });
}

export function getMapScatter(signal?: GenericAbortSignal) {
  return request({
    url: '/screen/map/scatter',
    method: 'get',
    signal
  });
}

export function getScreenData(signal?: GenericAbortSignal) {
  return request({
    url: '/screen/data',
    method: 'get',
    signal
  });
}
