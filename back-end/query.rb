require 'sinatra'
require 'mongo'

client = Mongo::Connection.new(:database=>'test')

get '/comments/:place' do
  cc = client[:comments].find({id: pid})
  if cc.length > 0
    return cc.to_json
  else
    status 404
  end
end
