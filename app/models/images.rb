
class Images < Parse::Object
  # See: https://github.com/modernistik/parse-stack#defining-properties

  # You can change the inferred Parse table/collection name below
  # parse_class "Images"

  property :photoType, :string
  property :breed, :string
  property :imageFile, :file
  property :likes, :integer
  property :age, :string

  # `like` is a Parse Relation to User class
  has_many :dislikedUsers, as: :user, through: :relation
  has_many :likedUsers, as: :user, through: :relation

  belongs_to :owner, as: :user, through: :relation
  # deny public write to Song records by default
  set_default_acl :public, read: true, write: false

  # See: https://github.com/modernistik/parse-stack#cloud-code-webhooks
  # define a before save webhook for Images
  webhook :before_save do
    images = parse_object
    # perform any validations with images
    # use `error!(msg)` to fail the save
    # ...
    images
  end

  ## define an after save webhook for Images
  #
  # webhook :after_save do
  #   images = parse_object
  #
  # end

  ## define a before delete webhook for Images
  # webhook :before_delete do
  #   images = parse_object
  #   # use `error!(msg)` to fail the delete
  #   true # allow the deletion
  # end

  ## define an after delete webhook for Images
  # webhook :after_delete do
  #   images = parse_object
  # end

  ## Example of a CloudCode Webhook function
  ## define a `helloWorld` Parse CloudCode function
  # webhook :function, :helloWorld do
  #   "Hello!"
  # end

end
