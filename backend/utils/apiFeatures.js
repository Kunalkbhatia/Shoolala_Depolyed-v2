class ApiFeatures{
    constructor(query , queryParams){
        this.query = query;
        this.queryParams = queryParams;
    }

    search(){
        
        const keyword = this.queryParams.keyword ? {
            name:{
                $regex: this.queryParams.keyword,
                $options: "i"
            }}
            :{};
            
            this.query = this.query.find({...keyword});
            return this;
        }
        
        filter(){
        let queryCopy = {...this.queryParams};
        // extracting category out from this.queryParams
        const removeFields = ["keyword" , "page" , "limit"];
        removeFields.forEach(field => delete queryCopy[field]);
        
        // Filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`);
        queryCopy = JSON.parse(queryStr);
        


        this.query = this.query.find(queryCopy);
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryParams.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;

    }
};

module.exports = ApiFeatures;