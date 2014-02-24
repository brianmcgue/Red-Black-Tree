class RBNode
  attr_accessor :value, :color, :parent, :left, :right
  
  def initialize(value)
    @value, @color = value, :red
    @parent, @left, @right = nil
  end
  
  def grandparent
    @grandparent ||= @parent.parent unless @parent.nil?
  end
  
  def is_left_child?
    return nil unless !@parent.nil?
    self == @parent.left
  end
  
  def has_left_parent?
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
  
  def to_s
    "#{@left} #{@value} #{@right}"
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
      if node.has_left_parent?
        uncle = node.right_uncle
        if uncle.nil? || uncle.color == :black
          rotate_left(node.parent) unless node.is_left_child?
          node.parent.color, grandparent.color = :black, :red
          rotate_right(grandparent)
          node = grandparent
        else
          node.parent.color, uncle.color = :black
          grandparent.color, node = :red, grandparent
        end
      else
        uncle = node.left_uncle
        if uncle.nil? || uncle.color == :black
          rotate_right(node.parent) if node.is_left_child?
          node.parent.color, grandparent.color = :black, :red
          rotate_left(grandparent)
          node = grandparent
        else
          node.parent.color, uncle.color = :black
          grandparent.color, node = :red, grandparent
        end
      end
      @root.color = :black
      puts self
    end
  end
  
  def root_case(node)
    if @root.nil?
      node.color, @root = :black, node
      return
    end
    rb_insert(node)
  end
  
  def rotate_left(n1)
    n2 = n1.right
    n1.right = n2.left
    n2.left.parent = n1 unless n2.left.nil?
    if n1 == @root
      @root == n2
    else
      if n1.is_left_child?
        n1.parent.left, n2.parent = n2, n1.parent
      else
        n1.parent.right, n2.parent = n2, n1.parent
      end
    end
    n2.left, n1.parent = n1, n2
  end
    
  def rotate_right(n1)
    n2 = n1.left
    n1.left = n2.right
    n2.right.parent = n1 unless n2.right.nil?
    if n1 == @root
      @root = n2
    else
      if n1.is_left_child?
        n1.parent.left, n2.parent = n2, n1.parent
      else
        n1.parent.right, n2.parent = n2, n1.parent
      end
    end
    n2.right, n1.parent = n1, n2
  end
  
  def to_s
    "#{@root}"
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

# t = RBTree.new
# t << 10
# t << 5
# t << 15
# t << 7
# t << 8
# puts t