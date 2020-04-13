import * as config from 'config';

const elastic = config.get('elastic')

export const elasticSearch = elastic;