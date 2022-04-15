class PurchasesController < ApplicationController

    def index
        render json: Purchase.all
    end

    def create
        purchase = Purchase.create!(purchase_params)
        render json: purchase, status: :created
    end

    private

    def purchase_params
        params.permit(:user_id, :item_id)
    end
end
