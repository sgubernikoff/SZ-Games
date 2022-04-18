class UsersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
rescue_from ActiveRecord::RecordNotFound, with: :not_found_response
    wrap_parameters format: []

    def index
        render json: User.all
    end

    def show
        user = User.find(session[:user_id])
        render json: user, include: :items, status: :created
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user
    end

    def destroy
        user = User.find(session[:user_id])
        session.delete :user_id
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:name, :username, :password, :password_confirmation, :points)
    end

    def unprocessable_entity_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def not_found_response
        render json: {error: "User not found"}, status: :not_found
    end

end

