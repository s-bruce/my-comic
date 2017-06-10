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
    comic.update({title: params[:title]})

    panel = Panel.find_by(comic_id: comic.id)
    panel.update({text: params[:text], image_url: params[:image_url], canvas_url: params[:canvas_url]})

    render json: comic
  end

  private

  def comic_params
    params.require(:comic).permit(
      :title,
      panels_attributes: [
        :text,
        :image_url,
        :canvas_url
      ]
    )
  end

end
