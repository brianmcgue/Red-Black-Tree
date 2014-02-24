require 'rspec'
require 'red_black_tree'

describe RBNode do
  describe "#initialize" do
    let(:n1) { RBNode.new(1) }
  
    it "sets value" do
      n1.value.should == 1
    end
  
    it "sets color to red" do
      n1.color.should == :red
    end
  
    it "sets parent, left, and right to nil" do
      n1.parent.should be_nil
      n1.left.should be_nil
      n1.right.should be_nil
    end
  end
end

describe RBTree do
  describe "#initialize" do
    subject { RBTree.new }
    
    it "sets root to nil" do
      subject.root.should be_nil
    end
  end
end