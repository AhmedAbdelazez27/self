// TODO: move to environment
export const Globals = {
  /////live//////
   Url: 'http://compassint.ddns.net:2027/api/services/app/',
  TokenUrl: 'http://compassint.ddns.net:2027/api/services/app/HrPersons/Login',
  ReportUrl: 'https://.tenxerp.com/HrDocumentRequest/PrintHrDocumentRequestPrint',  
  VactionReportUrl:  'https://compassint.tenxerp.com/HrPersonVacations/printVactionReportDocument',
   PayrollReportUrl:'https://compassint.tenxerp.com/PyPayrollOperations/printpayslip',

///////Local/////////////////
  //   ReportUrl: 'http://localhost:51312/HrDocumentRequest/PrintHrDocumentRequestPrint',  
  //    VactionReportUrl:  'http://localhost:51312/HrPersonVacations/printVactionReportDocument',
  //    PayrollReportUrl:'http://localhost:51312/PyPayrollOperations/printpayslip',
  //  Url:'http://localhost:20120/api/services/app/',
  // TokenUrl:'http://localhost:20120/api/services/app/HrPersons/Login',
};

export function callRtlStyle() {
  document.body.style.direction = 'rtl';
  if (document.getElementById('ltr-doc')) {
    let link = document.getElementById('ltr-doc');
    link.parentNode.removeChild(link);
  }

  if (!document.getElementById('rtl-doc')) {
    let toastr = document.getElementById('toastr');
    let link = document.createElement('link');
    link.id = 'rtl-doc';
    link.rel = 'stylesheet';
    link.href = './assets/bootstrap-rtl.min.css';
    toastr.before(link);
  }
}

export function removeRtlStyle() {
  document.body.style.direction = 'ltr';
  if (document.getElementById('rtl-doc')) {
    let link = document.getElementById('rtl-doc');
    link.parentNode.removeChild(link);
  }

  if (!document.getElementById('ltr-doc')) {
    let toastr = document.getElementById('toastr');
    let link = document.createElement('link');
    link.id = 'ltr-doc';
    link.rel = 'stylesheet';
    link.href = './assets/bootstrap.min.css';
    toastr.before(link);
  }
}
