defmodule Pay.Services.GoLiveStage do
  alias Pay.Services.GoLiveStage

  defstruct [:name]

  @type t :: %GoLiveStage{}
  @callback value :: GoLiveStage.t()
end

defmodule Pay.Services.GoLiveStage.NotStarted do
  alias Pay.Services.GoLiveStage

  @behaviour GoLiveStage
  def value, do: %GoLiveStage{name: "not_started"}
end

defmodule Pay.Services.GoLiveStage.Denied do
  alias Pay.Services.GoLiveStage

  @behaviour GoLiveStage
  def value, do: %GoLiveStage{name: "denied"}
end

defmodule Pay.Services.GoLiveStage.Live do
  alias Pay.Services.GoLiveStage

  @behaviour GoLiveStage
  def value, do: %GoLiveStage{name: "live"}
end
