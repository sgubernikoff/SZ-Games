class ItemsController < ApplicationController

    def index
        json render: Item.all
    end

    def show
        item = Item.find(params[:id])
        json render: item
    end
end
