class PurchasesController < ApplicationController

    def index
        render json: Purchase.all
    end

    def create
        purchase = Purchase.create!(purchase_params)
        item = Item.find(params[:item_id])
        user = User.find(session[:user_id])
        user.update(points: user.points - item.price)
        render json: {item: purchase.item, points: user.points}, status: :created
    end

    private

    def purchase_params
        params.permit(:user_id, :item_id)
    end
end
