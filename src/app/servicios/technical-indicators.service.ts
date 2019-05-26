import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TechnicalIndicatorsService {

  constructor(private http: HttpClient) { }

  public recuperarSMA(parbase: string, parcontra: string, intervalo: string, periodo_tiempo: number, tipo_series): Observable<any> {
    return this.http.get("https://www.alphavantage.co/query?function=SMA&symbol=" + parbase + parcontra + "&interval=" + intervalo + "&time_period=" + periodo_tiempo + "&series_type=" + tipo_series + "&apikey=602E2MV7A935WJP6")
  }
  public recuperarEMA(parbase: string, parcontra: string, intervalo: string, periodo_tiempo: number, tipo_series): Observable<any> {
    return this.http.get("https://www.alphavantage.co/query?function=EMA&symbol=" + parbase + parcontra + "&interval=" + intervalo + "&time_period=" + periodo_tiempo + "&series_type=" + tipo_series + "&apikey=602E2MV7A935WJP6")
  }
  public recuperarRSI(parbase: string, parcontra: string, intervalo: string, periodo_tiempo: number, tipo_series): Observable<any> {
    return this.http.get("https://www.alphavantage.co/query?function=RSI&symbol=" + parbase + parcontra + "&interval=" + intervalo + "&time_period=" + periodo_tiempo + "&series_type=" + tipo_series + "&apikey=602E2MV7A935WJP6")
  }
  public recuperarMACD(parbase: string, parcontra: string, intervalo: string, tipo_series): Observable<any> {
    return this.http.get("https://www.alphavantage.co/query?function=MACD&symbol=" + parbase + parcontra + "&interval=" + intervalo + "&series_type=" + tipo_series + "&apikey=602E2MV7A935WJP6")
  }

}
