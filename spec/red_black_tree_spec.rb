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
  
  describe "knows the family" do
    n1 = RBNode.new(1)
    n2 = RBNode.new(2)
    n3 = RBNode.new(3)
    n4 = RBNode.new(4)
    n5 = RBNode.new(5)
    n6 = RBNode.new(6)
    
    n1.left, n1.right, n2.parent, n3.parent = n2, n3, n1, n1
    n2.left, n2.right, n4.parent, n5.parent = n4, n5, n2, n2
    n3.left, n6.parent = n6, n3

    it "grandparents" do
      n1.grandparent.should be_nil
      n2.grandparent.should be_nil
      n4.grandparent.should == n1
    end
   
    it "side of parent" do
      n4.parent_is_left_child?.should be_true
      n6.parent_is_left_child?.should be_false      
    end
    
    it "side of child" do
      n2.is_left_child?.should be_true
      n3.is_left_child?.should be_false
    end
    
    it "uncles" do
      n2.left_uncle.should be_nil
      n4.right_uncle.should == n3
      n6.left_uncle.should == n2
    end
  end
end

describe RBTree do
  subject { RBTree.new }  
  let(:n1)  { RBNode.new(1)  }
  let(:n3)  { RBNode.new(3)  }
  let(:n4)  { RBNode.new(4)  }
  let(:n7)  { RBNode.new(7)  }
  let(:n8)  { RBNode.new(8)  }
  let(:n9)  { RBNode.new(9)  }
  let(:n10) { RBNode.new(10) }
  let(:n11) { RBNode.new(11) }
  let(:n12) { RBNode.new(12) }

  
  describe "#initialize" do
    it "sets root to nil" do
      subject.root.should be_nil
    end
  end
  
  describe "#insert" do
    it "inserts root and changes color to black" do
      subject.insert(n1)
      subject.root.should == n1
      subject.root.color.should == :black
    end
    
    it "inserts a red child onto a black node" do
      subject.insert(n1)
      subject.insert(n7)
      subject.root.should == n1
      subject.root.color.should == :black
      subject.root.right.should == n7
      subject.root.right.color.should == :red
    end

    it "inserts red child onto inside of red parent nil uncle and adjusts" do
      subject.insert(n1)
      subject.insert(n7)
      subject.insert(n3)
      subject.root.should == n3
      subject.root.color.should == :black
      subject.root.left.value.should == 1
      subject.root.right.value.should == 7
      subject.root.left.color.should == :red
      subject.root.right.color.should == :red
    end
    
    it "insert red child onto outside of red parent nil uncle and adjusts" do
      subject.insert(n1)
      subject.insert(n7)
      subject.insert(n8)
      subject.root.should == n7
      subject.root.color.should == :black
      subject.root.left.value.should == 1
      subject.root.right.value.should == 8
      subject.root.left.color.should == :red
      subject.root.right.color.should == :red
    end
    
    it "insert red child to red parent on opposite side of red uncle" do
      subject.insert(n3)
      subject.insert(n1)
      subject.insert(n7)
      subject.root.should == n3
      subject.root.color.should == :black
      subject.root.left.should == n1
      subject.root.right.should == n7

      subject.insert(n8)
      subject.root.should == n3
      subject.root.right.color.should == :black
      subject.root.left.color.should == :black
      subject.root.right.right.color.should == :red
      subject.root.right.right.value.should == 8
    end
    
    it "insert red child to red parent on same side of red uncle" do
      subject.insert(n3)
      subject.insert(n1)
      subject.insert(n7)
      subject.insert(n4)
      subject.root.should == n3
      subject.root.right.color.should == :black
      subject.root.right.value.should == 7
      subject.root.right.left.color.should == :red
      subject.root.right.left.value.should == 4
      subject.root.left.color.should == :black
      subject.root.left.value.should == 1
    end

    it "insert red child to red parent with black uncle and adjusts" do
      subject.insert(n3)
      subject.insert(n1)
      subject.insert(n7)
      subject.insert(n8)
      subject.insert(n9)

      subject.root.should == n3
      subject.root.left.color.should == :black
      subject.root.left.value.should == 1
      subject.root.right.should == n8
      subject.root.right.color.should == :black
      subject.root.right.left.should == n7
      subject.root.right.left.color.should == :red
      subject.root.right.right.should == n9
      subject.root.right.right.color.should == :red
    end

    it "insert red child to red parent with red uncle on outside of uncle" do
      subject.insert(n3)
      subject.insert(n1)
      subject.insert(n7)
      subject.insert(n8)
      subject.insert(n9)
      subject.insert(n10)

      subject.root.should == n3
      subject.root.right.color.should == :red
      subject.root.right.value.should == 8
      subject.root.left.color.should == :black
      subject.root.left.value.should == 1
      subject.root.right.left.should == n7
      subject.root.right.right.should == n9
      subject.root.right.right.right.should == n10
      subject.root.right.right.right.color.should == :red
    end

    it "insert a red child at the bottom of a tree and rotates about root" do
      subject.insert(n3)
      subject.insert(n1)
      subject.insert(n7)
      subject.insert(n8)
      subject.insert(n9)
      subject.insert(n10)
      subject.insert(n11)
      subject.insert(n12)

      #check left sub tree
      subject.root.should == n8
      subject.root.color.should == :black
      subject.root.left.should == n3
      subject.root.left.color.should == :red
      subject.root.left.left.should == n1
      subject.root.left.right.should == n7
      subject.root.left.left.color.should == :black
      subject.root.left.right.color.should == :black

      #check right sub tree
      subject.root.right.should == n10
      subject.root.right.color.should == :red
      subject.root.right.left.should == n9
      subject.root.right.left.color.should == :black
      subject.root.right.right.should == n11
      subject.root.right.right.color.should == :black
      subject.root.right.right.right.should == n12
      subject.root.right.right.right.color.should == :red
    end

    it "spot check for left side of the tree adding" do
      subject.insert(n12)
      subject.insert(n11)
      subject.insert(n10)
      subject.insert(n9)
      subject.insert(n8)
      subject.insert(n7)
      subject.insert(n3)
      subject.insert(n1)

      #this is mostly a sanity check
      subject.root.left.left.left.should == n1
      subject.root.should == n9
      subject.root.right.right.should == n12
    end
  end  
end