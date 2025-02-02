import mongoose from 'mongoose';

const newsArticleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true
  },
  title: {
   type: String,
   required: true
 },
 description: {
  type: String,
  required: true
},
date:{
  type: String,
  required: true
},
source:{
  type: String,
  required: true
},
 url: {
  type: String,
  required: true,
  validate: {
    validator: function(v) {
      try {
        new URL(v);
        return true;
      } catch(e) {
        return false;
      }
    },
    message: 'La imagen debe ser una URL válida'
  }
 },
image:{
  type: String,
  required: true,
  validate: {
    validator: function(v) {
      try {
        new URL(v);
        return true;
      } catch(e) {
        return false;
      }
    },
    message: 'La imagen debe ser una URL válida'
  }
},
 owner: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "user",
   select: false
 }
});

export default mongoose.model('NewsArticle', newsArticleSchema);