defmodule PayGovAu.Model.CreateRequestPaymentTest do
  use ExUnit.Case

  test "decodes metadata" do
    mod = Poison.decode!(~s({ "metadata": { "a": "b", "c": 6 } }), as: %PayGovAu.Model.CreateRequestPayment{})

    assert mod.metadata == %{"a" => "b", "c" => 6}
  end
end
