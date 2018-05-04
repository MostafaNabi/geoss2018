require 'nokogiri'
require 'json'

class Nokogiri::XML::Node
  def to_json(*a)
    {"$name"=>name}.tap do |h|
      kids = children.to_a
      h.merge!(attributes)
      h.merge!("$text"=>text) unless text.empty?
      h.merge!("$kids"=>kids) unless kids.empty?
    end.to_json(*a)
  end
end

x = Nokogiri::XML(open('map').read)
x.xpath('/osm/node').each do |node|
  c = node.children
  next if c.length < 1
  tt = c.xpath('//tag')
  p tt
  #tags = Hash.new[.map do |x|
  #  [x["name"],x["value"]]
  #end]
  #p tags
  #p node
end
