import { Injectable, HttpService, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.entity';
import { elasticSearch } from '../config';

@Injectable()
export class ProductsService {
  
  private elasticSearchURL: string;
  
  private logger: Logger = new Logger('ProductsService');

  constructor(private httpService: HttpService) {
    const { url, endpoint } = elasticSearch; 
    this.elasticSearchURL = `${url}/${endpoint}/_search`;
  }
  /**
   * 
   * @param skuCode 
   */
  findBySku(skuCode: string): Observable<Product[]> {
    const querySearch = {
      "query": {
        "match": { "skuCode": skuCode }
      }
    }
    this.logger.log(`Fetching from elastic With query ${JSON.stringify(querySearch)}`);
    return this.httpService.post(this.elasticSearchURL, querySearch).pipe(map(r => r.data)).pipe(map(r => r.hits.hits));
  }
  /**
   * 
   * @param text 
   */
  findByText(text: string): Observable<Product[]> {
    const textSearch = {
      "query": {
        "simple_query_string": {
          "query": text,
          "fields": ["description^5", "skuText^3"],
          "default_operator": "and",
          "auto_generate_synonyms_phrase_query": true
        }
      }
    }
    this.logger.log(`Fetching from elastic With query ${JSON.stringify(textSearch)}`);
    return this.httpService.post(this.elasticSearchURL, textSearch).pipe(map(r => r.data)).pipe(map(r => r.hits.hits));
  }
  findAll() : Observable<Product[]> {
    this.logger.log(`Fetching from elastic without query`);
    return this.httpService.get(this.elasticSearchURL).pipe(map(r => r.data)).pipe(map(r => r.hits.hits));
  }
}
