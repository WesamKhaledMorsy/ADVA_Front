export class GlobalFunctions {
    static  orderBy:string = 'StatusKey';
    static  reverse:boolean=true;
    static  sortDir:string = 'desc';

    static  sortColumn(colName: string,orderBy:string) {
        this.orderBy = orderBy;
        if (this.reverse) {
          this.reverse = false;
          // this.reverseclass = 'arrow-up';
          //this.sortDir = "Asc";
          if (this.sortDir = "Desc") {
            this.sortDir = "Asc";
          } else {
            this.sortDir = "Desc";
          }
        } else {
          this.reverse = true;
          // this.reverseclass = 'arrow-down';
          //  this.sortDir = 'Desc';
          if (this.sortDir = "Asc") {
            this.sortDir = "Desc";
          } else if (this.sortDir = "Desc") {
            this.sortDir = "Asc";
          }
        }
        let returnobj:any={
            'sortDir':this.sortDir,'reverse':this.reverse
        }
        return returnobj
     //   this.GetAllAndsearchStatus();
      }
      static sortClass(col: string,reverse:boolean): any {
        if (this.orderBy == col) {
          if (this.reverse) {
            return 'fas fa-sort-down';
          } else {
            return 'fas fa-sort-up';
          }
        }
        else if (this.orderBy != col) {
          return 'fas fa-sort-up';
        }
      }

}
