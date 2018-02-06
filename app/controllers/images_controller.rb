require 'rest-client'

class ImagesController < ApplicationController

  # GET /controllers
  def index
  end

  # Post
  def saveImage
    @image = params[:image]

    ##
    #  Save to back4app
    ##
    imageFile = Parse::File.new "image.png", @image.read , @image.content_type
    imageFile.save

    image = Images.new
    image.breed = params[:breed]
    image.age = params[:age]
    image.photoType = params[:photoType]
    image.imageFile = imageFile
    image.save

    render json: { status: "success" }
  end

  def uploadPhoto
    @image = params[:image]
    @uploadStatus = ""

    ##
    #  Save to vize.ai
    ##

    response = RestClient.post("http://cl-api.vize.ai/3081",
                               {
                                   :image => @image
                               }, {
                                   :Authorization => 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjI5ODQsImlhdCI6MTUwODgxODczNCwiZXhwIjoxNTE2NTk0NzM0fQ.O8XXXq15aVUmXvgaYw-2b2wHbVntTZBfkAQ6omsV1gQ',
                                   "Content-Type": 'application/x-www-form-urlencoded',
                                   Accept: :json
                               }
    ) { |response, request, result|
      case response.code
        when 200
          @uploadStatus = "success"
        when 400
          @uploadStatus = "bad"
        when 429
          @uploadStatus = "many"
        else
          @uploadStatus = "unknown"

      end

      render json: { status: @uploadStatus, data: JSON.parse(response.body) }
    }
  end
end
