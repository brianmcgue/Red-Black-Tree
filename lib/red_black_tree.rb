class RBNode
  attr_accessor :value, :color, :parent, :left, :right
  
  def initialize(value)
    @value, @color = value, :red
    @parent, @left, @right = nil
  end
  
  def get_child(dir)
    dir == :left ? @left : @right
  end
  
  def grandparent
    @parent.nil? ? nil : @parent.parent
  end
  
  def is_left_child?
    return nil if @parent.nil?
    self == @parent.left
  end
  
  def parent_is_left_child?
    @parent.is_left_child?
  end
  
  def left_uncle
    gp = grandparent
    gp.nil? ? nil : gp.left
  end
  
  def right_uncle
    gp = grandparent
    gp.nil? ? nil : gp.right
  end
  
  def set_child(dir, value)
    if dir == :left
      @left = value
    else
      @right = value
    end
  end
  
  def to_s
    "#{@left} #{@value}(#{@color}) #{@right}"
  end
  
  def which_child
    is_left_child? ? :left : :right
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
  
  def black_uncle(node, uncle)
    if node.which_child != node.parent.which_child
      node = node.parent
      rotate(node, node.which_child)
    end
    node.parent.color, node.grandparent.color = :black, :red
    opp_dir = node.which_child == :left ? :right : :left
    rotate(node.grandparent, opp_dir)
    node.grandparent
  end
  
  def cases(node, uncle)
    if uncle.nil? || uncle.color == :black
      black_uncle(node, uncle)
    else
      recolor(node, uncle)
    end
  end
  
  def insert(node)
    root_case(node)
  end
  
  def rb_insert(node)
    tree_insert(node)
    until node == @root || node.parent.color == :black
      uncle = (node.parent_is_left_child? ? node.right_uncle : node.left_uncle)
      node = cases(node, uncle)
      @root.color = :black
    end
  end
  
  def recolor(node, uncle)
    node.parent.color, uncle.color = :black, :black
    node.grandparent.color, node = :red, node.grandparent    
    node
  end
  
  def root_case(node)
    if @root.nil?
      node.color, @root = :black, node
      return
    end
    rb_insert(node)
  end
  
  def rotate(parent, dir1)
    dir2 = ((dir1 == :left) ? :right : :left)
    child = parent.get_child(dir2)
    parent.set_child(dir2, child.get_child(dir1))
    child.get_child(dir1).parent = parent unless child.get_child(dir1).nil?
    if parent == @root
      @root = child
    else
      child.parent = parent.parent
      parent.parent.set_child(parent.which_child, child) 
    end
    parent.parent = child
    child.set_child(dir1, parent)
  end
  
  def to_s
    "Root: #{@root.value}\n#{@root}"
  end
  
  def tree_insert(node, root = @root)    
    dir = node.value < root.value ? :left : :right
    if root.get_child(dir).nil?
      root.set_child(dir, node)
      node.parent = root
    else
      tree_insert(node, root.get_child(dir))
    end
  end
end