class Api::V1::ComicBooksController < ApplicationController
  before_action :authorize_account!

  def index
    comic_books = ComicBook.all
    render json: comic_books
  end

  def show
    comic_book = ComicBook.find(params[:id])
    render json: comic_book
  end

  def create
    comic_book = ComicBook.create(comic_book_params)
    render json: comic_book
  end

  def update
    comic_book = ComicBook.find(params[:id])
    comic_book.update(comic_book_params)
    render json: comic_book, include: 'comics.panels'
  end

  def user_comics
    user = Account.find(params[:id])
    comic_books = user.comic_books
    render json: comic_books, include: 'comics.panels'
  end

  private

  def comic_book_params
    params.require(:comic_book).permit(
      :title,
      :account_id,
      comics_attributes: [
        :id,
        :canvas_url,
        :comic_book_id,
        panels_attributes: [
          :id,
          :text,
          :image_url,
          :comic_id
        ]
      ]
    )
  end

end
