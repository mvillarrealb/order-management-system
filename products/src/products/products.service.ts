import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.entity';
import { elasticSearch } from '../config';

@Injectable()
export class ProductsService {
  
  private elasticSearchURL: string;

  constructor(private httpService: HttpService) {
    const { url, endpoint } = elasticSearch; 
    this.elasticSearchURL = `${url}/${endpoint}/_search`;
  }
  /**
   * 
   * @param skuCode 
   */
  findBySku(skuCode: string): Observable<Product> {
    const querySearch = {
      query: {
        match: {
          skuCode
        }
      }
    }
    return this.httpService.post(this.elasticSearchURL, querySearch).pipe(map(r => r.data));
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
    return this.httpService.post(this.elasticSearchURL, textSearch).pipe(map(r => r.data));
  }
}
