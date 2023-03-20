export const restApiConfig = {
  host:'http://localhost:8080/',
  logIn:'api/v1/auth/signin',
  countries: 'api/v1/country/list',
  tenderTypes: 'api/v1/tender_type/list',
  currencies: 'api/v1/currency/list',
  newTender: 'api/v1/tender',
  uploadFile: 'api/v1/document/upload',
  presignedUrl: 'api/v1/document/location',
  totalByContractor: 'api/v1/tender/contractor/total',
  tendersByContractor: 'api/v1/tender/contractor/list',
  tenderContractorDetails: 'api/v1/tender/contractor/details',
  offerDetails: 'api/v1/offer/details',
  offersByTender: 'api/v1/offer/list',
  offersByContractor: 'api/v1/offer/contractor/list'
};
