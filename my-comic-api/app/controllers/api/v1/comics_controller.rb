class Api::V1::ComicsController < ApplicationController

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

  private

  def comic_params
    params.require(:comic).permit(
      :title,
      :canvas_url,
      panels_attributes: [
        :id,
        :text,
        :image_url
      ]
    )
  end

end
