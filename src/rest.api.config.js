export const restApiConfig = {
  host:'http://localhost:8080/',
  logIn:'api/v1/auth/signin',
  countries: 'api/v1/country/list',
  cpvs: 'api/v1/cpv/list',
  tenderTypes: 'api/v1/tender_type/list',
  currencies: 'api/v1/currency/list',
  newTender: 'api/v1/tender',
  newOffer: 'api/v1/offer',
  uploadFile: 'api/v1/document/upload',
  presignedUrl: 'api/v1/document/location',
  total: 'api/v1/total',
  tendersList: 'api/v1/tender/list',
  tenderDetails: 'api/v1/tender/details',
  tenderDetailsByOffer: 'api/v1/tender/details/offer',
  offerDetails: 'api/v1/offer/details',
  offersList: 'api/v1/offer/list',
  awardDecision: 'api/v1/offer/decision/award',
  rejectDecision: 'api/v1/offer/decision/reject',
  decision: 'api/v1/offer/decision',
};
