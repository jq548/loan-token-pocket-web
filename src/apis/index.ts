import apiClient from '@/utils/request';

// Loan parameter configuration
export const loanParamsConfig = () => apiClient.get('/bsc/config');

// get lp quantity by calculate
interface ICalculateUsdtParamsType {
  amount: number;
}
export const getLpQuantity = (params: ICalculateUsdtParamsType): Promise<any> =>
  apiClient.get('/leo/calculate_usdt', { params });

export const getProvideRecord = (params: any): Promise<any> =>
  apiClient.get('/bsc/provide_record', { params });

export const getProvideIncomeWithrawRecord = (params: any): Promise<any> =>
  apiClient.get('/bsc/provide_income_withdraw_record', { params });

export const getExchangeRecord = (params: any): Promise<any> =>
  apiClient.get('/bsc/exchange_record', { params });

// save mortgage payment information
interface ISaveMortgageInfoParamsType {
  aleo_address: string;
  aleo_amount: number;
  bsc_address?: string; // when type === 0, this param is required
  email?: string; // when type === 0, this param is required
  stages?: number; // when type === 0, this param is required
  day_per_stage?: number; // when type === 0, this param is required
  loan_type?: 1 | 2; // when type === 0, this param is required
  type: 0 | 1;
  loan_id?: number; // when type === 1, this param is required
}
export const saveMortgageInfo = (data: ISaveMortgageInfoParamsType) =>
  apiClient.post<ISaveMortgageInfoParamsType>('/leo/save', { data });

// get my loan info
export const getMyLoanInfo = (params: { address: string }) =>
  apiClient.get('/bsc/loan_list', { params });

// get overview info
export const getOverview = () => apiClient.get('/leo/overview');
