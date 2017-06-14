class Api::V1::ComicsController < ApplicationController
  before_action :authorize_account!

  def index
    comics = Comic.all
    render json: comics
  end

  def show
    comic = Comic.find(params[:id])
    render json: comic
  end

  def create
    comic = Comic.create(comic_params)
    render json: comic
  end

  def update
    comic = Comic.find(params[:id])
    comic.update(comic_params)
    render json: comic
  end

  def user_comics
    user = Account.find(params[:id])
    comics = user.comics
    render json: comics
  end

  private

  def comic_params
    params.require(:comic).permit(
      :title,
      :canvas_url,
      :account_id,
      panels_attributes: [
        :id,
        :text,
        :image_url
      ]
    )
  end

end
