class Api::V1::AuthController < ApplicationController

  def create
    account = Account.find_by(username: params[:username])
    if account.present? && account.authenticate(params[:password])
      token = JWT.encode({account_id: account.id}, ENV['JWT_SECRET'], ENV['JWT_ALGORITHM'])
      render json: {
        account: {
          id: account.id,
          username: account.username
        },
        token: token
      }
    else
      render json: {error: 'No account or password found'}
    end
  end

  def show
    account = current_account
    render json: account
  end
end
