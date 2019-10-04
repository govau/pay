defmodule Pay.Services.Service.GoLiveStage do
  alias Pay.Services.Service.GoLiveStage

  defstruct [:name]

  @type t :: %GoLiveStage{}
  @callback value :: GoLiveStage.t()
end

defmodule Pay.Services.Service.GoLiveStage.NotStarted do
  alias Pay.Services.Service.GoLiveStage

  @behaviour GoLiveStage
  def value, do: %GoLiveStage{name: "not_started"}
end

defmodule Pay.Services.Service.GoLiveStage.Denied do
  alias Pay.Services.Service.GoLiveStage

  @behaviour GoLiveStage
  def value, do: %GoLiveStage{name: "denied"}
end

defmodule Pay.Services.Service.GoLiveStage.Live do
  alias Pay.Services.Service.GoLiveStage

  @behaviour GoLiveStage
  def value, do: %GoLiveStage{name: "live"}
end
