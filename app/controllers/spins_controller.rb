class SpinsController < ApplicationController

  def index
    render json: Spin.all
  end

  def show
    render json: Spin.all.sample
  end
  
end
