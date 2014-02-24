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
    grandparent
    @grandparent && @grandparent.left == @parent
  end
  
  def left_uncle
    grandparent
    @grandparent.nil? ? nil : @grandparent.left
  end
  
  def right_uncle
    grandparent
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
    root_case(node)
  end
  
  def insert(node)
    root_case(node)
  end
  
  def rb_insert(node)
    tree_insert(node)
    until node == @root || node.parent.color == :black
      return if node.parent == @root
      grandparent = node.grandparent
      if node.left_parent?
        uncle = node.right_uncle
        if uncle.nil? || uncle.color == :black
          
        else
          node.parent.color, uncle.color = :black
          grandparent.color, node = :red, grandparent
        end
      else
        uncle = node.left_uncle
        
      end
      @root.color = :black
    end
  end
  
  def root_case(node)
    if @root.nil?
      node.color, @root = :black, node
      return
    end
    rb_insert(node)
  end
  
  def rotate_left(node)
    
  end
    
  def rotate_right(node)
    
  end
  
  def tree_insert(node, root = @root)
    if node.value < root.value
      if root.left.nil?
        root.left, node.parent = node, root
      else
        tree_insert(node, root.left)
      end
    else
      if root.right.nil?
        root.right, node.parent = node, root
      else
        tree_insert(node, root.right)
      end
    end
  end
end