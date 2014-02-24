require 'rspec'
require 'red_black_tree'

describe "#node" do
  let(:n1) { RBNode.new(1) }
  
  it "initializes value" do
    n1.value.should == 1
  end
  
  it "initializes color to red" do
    n1.color.should == :red
  end
end