require 'rspec'
require 'red_black_tree'

describe RBNode do
  context "on initialize" do
    let(:n1) { RBNode.new(1) }
  
    it "initializes value" do
      n1.value.should == 1
    end
  
    it "initializes color to red" do
      n1.color.should == :red
    end
  
    it "initializes parent, left, and right to nil" do
      n1.parent.should be_nil
      n1.left.should be_nil
      n1.right.should be_nil
    end
  end
  
  context "within the family" do
    let(:n1) { RBNode.new(1) }
    let(:n2) { RBNode.new(2) }
    let(:n3) { RBNode.new(3) }
    let(:n4) { RBNode.new(4) }
    
    before(:each) do
      n1.left, n1.right, n2.parent, n3.parent = n2, n3, n1, n1
      n2.right, n3.parent = n3, n2
    end
    
    it "knows the grandparent" do
      n1.grandparent.should be_nil
      n2.grandparent.should be_nil
      n3.grandparent.should == n1
    end
  end
end