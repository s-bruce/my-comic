class Api::V1::AccountsController < ApplicationController

  def create
    if Account.find_by(username: account_params[:username])
      render json: {error: 'Username already exists'}
    else
      account = Account.create(account_params)
      render json: account
    end
  end

  private

  def account_params
    params.require(:account).permit(:username, :password)
  end

end
