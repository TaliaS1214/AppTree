class CommentsController < ApplicationController

  def index
    comments = Comment.where(app_id: params[:id])
    render json: comments.order(created_at: :desc).to_json(include: :user), status: 200
  end

  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment.to_json(include: :user), status: 200
    end
  end

  def update
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :user_id, :app_id)
  end

end
