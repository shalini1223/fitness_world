const getOffset = (page,limit) =>{
    if(page < 1) return 0;
    if(limit < 1) limit =10;
    return (page -1) * limit;
};

export const create = async function (Model, dataToSave) {
    return await Model.create(dataToSave);
};

export const insertMany = async function (Model, dataToSave) {
    return await Model.insertMany(dataToSave);
};

export const findOneAndUpdate = async function(
    Model,
    filter, dataToUpdate,
    options = {new:true}
 ){
    return await Model.findOneAndUpdate(filter,dataToUpdate,options).lean();
 };

 export const findOneAndDelete = async function (Model,filter){
    return await Model.findOneAndDelete(filter).lean();
 };

 export const find = async function (
    Model,
    filter ={},
    projection ={},
    sort = {creetedAt: 1}
 ){
    return await Model.find(filter, projection).sort(sort);
 };

 export  const findOne = async function (Model, filter, projection ={}){
    return await Model.findOne(filter, projection).lean();
 };

 export const findwithLimit =async function (
    Model,
    filter,
    limit,
    projection ={},
    sort = {createdAt : -1}
 ){
    return await Model.find(filter, projection).sort(sort).limit(limit);
 };

 export const findWithPagination = async function (
    Model,
    filter,
    page =0 ,
    limit =10,
    projection ={},
    sort = {createdAt: -1}
 ) {
    return await Model.find(filter, projection)
    .sort(sort)
    .skip(getOffset(parseInt(page),parseInt(limit)))
    .limit(parseInt(limit))
 };

 export const aggregation = async function (Model,pipeline){
    return await Model.aggregation(pipeline);
 };

export const countDocuments = async function(Model, filter ={}){
    return await Model.countDocuments(filter);
};

export const findById = async function (Model, id, projection = {}){
    return await Model.findById(id, projection).lean();
};

export const findByIdAndDelete = async function(Model, id){
    return await Model.findByIdAndDelete(id);
};

export const findByIdAndUpdate = async function(Model, id, dataToUpdate,options ={new:true}){
   return await Model.findByIdAndUpdate(id, dataToUpdate,options).lean();
};

export const deleteMany = async function(Model,filter) {
   return await Model.deleteMany(filter);
};

export const updateMany = async function(Model, filter, dataToUpdate){
   return await Model.updateMany(filter, dataToUpdate);
}