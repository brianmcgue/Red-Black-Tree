class RBNode
  attr_accessor :value, :color, :parent, :left, :right
  
  def initialize(value)
    @value, @color = value, :red
    @parent, @left, @right = nil
  end
  
  def grandparent
    @grandparent ||= @parent.parent unless @parent.nil?
  end
  
  def left_parent?
    @grandparent && @grandparent.left == @parent
  end
  
  def left_uncle
    @grandparent.nil? ? nil : @grandparent.left
  end
  
  def right_uncle
    @grandparent.nil? ? nil : @grandparent.right
  end
end

class RBTree
  attr_accessor :root
  
  def initialize
    @root = nil
  end
  
  def <<(val)
    node = RBNode.new(val)
    rb_insert(node)
  end
  
  def rb_insert(node)
    
  end
  
  def rotate_left(node)
    
  end
    
  def rotate_right(node)
    
  end
  
  def tree_insert(node, root = @root)
    if node.value < root.value
      if root.left.nil?
        node.instance_variable_set(:@left, node)
      else
        tree_insert(node, root.left)
      end
    else
      if root.left.nil?
        node.instance_variable_set(:@left, node)
      else
        tree_insert(node, root.left)
      end
    end
  end
end