class RingsController < ApplicationController
  before_action :set_ring, only: [:show, :edit, :update, :destroy]

  # GET /rings
  # GET /rings.json
  def index
    @rings = Ring.all
    render json: @rings
  end

  # GET /rings/1
  # GET /rings/1.json
  def show
    render json: @ring
  end

  # POST /rings
  # POST /rings.json
  def create
    @ring = Ring.new(ring_params)

    respond_to do |format|
      if @ring.save
        render json: @ring, status: :created, location: @ring
      else
        render json: @ring.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /rings/1
  # PATCH/PUT /rings/1.json
  def update
      if @ring.update(ring_params)
        render json: @ring, status: :ok, location: @ring
      else
        render json: @ring.errors, status: :unprocessable_entity
      end
  end

  # DELETE /rings/1
  # DELETE /rings/1.json
  def destroy
    @ring.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ring
      @ring = Ring.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ring_params
      params.require(:ring).permit(:name, :description, :model, :image_url, :model_url)
    end
end
